import { plainToInstance } from "class-transformer";
import { orderRepository } from "./repository/orderRepository";
import { IOrderFilter } from "../models/IOrderFilter";
import { Order } from "../entities/Orders";
import { OrderDTO, IOrderRes } from "../models/OrderDTO";
import { generateOrderId } from "../utils/GenerateCodeOrder";
import CustomError from "@shares/models/CustomerError";
import api from "src/utils/API";
import redisClient from "@shares/configs/redis";
import { sendOrderToQueue } from "src/queue";
import { StatusTable } from "src/models/StatusTable";
import { StatusDish } from "src/entities/OrderDetaill";
export class orderService {
  protected repository: orderRepository;
  constructor() {
    this.repository = new orderRepository();
  }
  async getFilter(filter: IOrderFilter): Promise<IOrderRes[]> {
    const datas = await this.repository.filter(filter);
    try {
      // Gọi API lấy thông tin user và table song song
      const orderDetails = await Promise.all(
        datas.map(async (order) => {
          const [user, table] = await Promise.all([
            api
              .get(`${api.url.urlAuth}/${api.url.user}/${order.userId}`)
              .then((res) => res.data.data)
              .catch((error) => {
                console.error(
                  "❌ Lỗi API Auth:",
                  error.response?.data || error.message
                );
                return null; // Nếu lỗi, trả về null
              }),

            api
              .get(`${api.url.urlTable}/${api.url.table}/${order.tableId}`)
              .then((res) => res.data.data)
              .catch((error) => {
                console.error(
                  "❌ Lỗi API Table:",
                  error.response?.data || error.message
                );
                return null; // Nếu lỗi, trả về null
              }),
          ]);

          return {
            id: order.id,
            codeOrder: order.codeOrder,
            user: user ? { id: user.id, username: user.username } : null,
            table: table ? { id: table.id, nameTable: table.nameTable } : null,
            created_at: order.created_at,
          } as IOrderRes;
        })
      );

      return orderDetails;
    } catch (error) {
      console.error("❌ Lỗi trong quá trình lấy danh sách đơn hàng:", error);
      throw new CustomError(500, "Lỗi trong quá trình lấy danh sách đơn hàng.");
    }
  }
  async validate(data: OrderDTO): Promise<void> {
    try {
      // 1️⃣ Gọi API lấy thông tin bàn
      const tableData = await this.fetchTableData(data.tableId);
      if (!tableData) {
        throw new CustomError(
          400,
          `Không tìm thấy bàn có id = ${data.tableId}`,
          "tableId"
        );
      }

      // 2️⃣ Gọi API lấy danh sách món ăn song song
      await Promise.all(
        data.orderDetails.map(async (orderDetail) => {
          await this.fetchDishData(orderDetail.dishId);
        })
      );

      // 3️⃣ Kiểm tra trạng thái bàn từ Redis
      let tableStatus;
      try {
        tableStatus = await redisClient.get(`table:${data.tableId}`);
      } catch (error) {
        console.error("❌ Redis Error:", error);
        tableStatus = "unknown"; // Nếu Redis lỗi, không làm hỏng validate
      }

      if (tableStatus === StatusTable.used) {
        throw new CustomError(400, "Bàn này đã được sử dụng", "tableId");
      }
    } catch (error: any) {
      console.error("❌ Lỗi Validate:", error); // Log lỗi chi tiết
      if (error instanceof CustomError) throw error;
      throw new CustomError(500, `Lỗi hệ thống: ${error.message}`, "server");
    }
  }

  // 📌 Hàm lấy dữ liệu bàn
  async fetchTableData(tableId: number) {
    return api
      .get(`${api.url.urlTable}/${api.url.table}/${tableId}`)
      .then((res) => res.data)
      .catch((error) => {
        console.error(
          "❌ Lỗi API Table:",
          error.response?.data || error.message
        );
        return null; // Trả về null nếu lỗi
      });
  }

  // 📌 Hàm lấy dữ liệu món ăn
  async fetchDishData(dishId: string) {
    return api
      .get(`${api.url.urlDish}/${api.url.dish}/${dishId}`)
      .then((res) => res.data)
      .catch((error) => {
        console.error(
          "❌ Lỗi API Dish:",
          error.response?.data || error.message
        );
        throw new CustomError(
          400,
          `Không tìm thấy món ăn có id = ${dishId}`,
          "dishId"
        );
      });
  }

  async create(data: OrderDTO): Promise<Order> {
    await this.validate(data);
    const model: Order = plainToInstance(Order, {
      ...data,
      codeOrder: generateOrderId(),
    });
    const record = await this.repository.create(model);
    if (record) {
      for (const orderDetail of record.orderDetails) {
        const order = {
          tableId: record.tableId,
          orderDetail: orderDetail,
        };
        await sendOrderToQueue(order);
        // Lưu trạng thái đơn hàng vào Redis
        await redisClient.set(
          `order:${orderDetail.id}:${orderDetail.dishId}`,
          StatusDish.pendding,
          "EX",
          3 * 60 * 1000
        );
      }
      // Lưu trạng thái bàn
      await redisClient.set(
        `table:${model.tableId}`,
        StatusTable.used,
        "EX",
        3 * 60 * 1000
      );
    }
    return record;
  }
  async update(id: number, data: OrderDTO): Promise<void> {
    const record = await this.isNotFound(id);
    const model: Order = plainToInstance(Order, {
      ...data,
    });
    await this.repository.update(record, model);
  }
  async remove(id: number): Promise<void> {
    await this.isNotFound(id);
    await this.repository.delete(id);
  }
  async isNotFound(id: number): Promise<Order> {
    const data = await this.repository.getById(id);
    if (data == null) {
      throw new CustomError(404, `Không tìm thấy hóa đơn nào có id = ${id}`);
    }
    return data;
  }
  async getById(id: number): Promise<IOrderRes> {
    const data = await this.repository.getById(id);
    if (!data) {
      throw new CustomError(404, `Không tìm thấy hóa đơn nào có id = ${id}`);
    }

    try {
      // Gọi API song song để tối ưu hiệu suất
      const [user, table] = await Promise.all([
        api
          .get(`${api.url.urlAuth}/${api.url.user}/${data.userId}`)
          .then((res) => res.data.data)
          .catch((error) => {
            console.error(
              "❌ Lỗi API Auth:",
              error.response?.data || error.message
            );
            return null; // Trả về null nếu lỗi
          }),

        api
          .get(`${api.url.urlTable}/${api.url.table}/${data.tableId}`)
          .then((res) => res.data.data)
          .catch((error) => {
            console.error(
              "❌ Lỗi API Table:",
              error.response?.data || error.message
            );
            return null; // Trả về null nếu lỗi
          }),
      ]);
      // Trả về dữ liệu với kiểm tra null
      const dataRes: IOrderRes = {
        id: data.id,
        codeOrder: data.codeOrder,
        user: {
          id: user.id,
          username: user.username,
        },
        table: {
          id: table.id,
          nameTable: table.nameTable,
        },
        created_at: data.created_at,
      };
      return dataRes;
    } catch (error) {
      throw new CustomError(500, "Lỗi trong quá trình lấy dữ liệu đơn hàng.");
    }
  }
}
