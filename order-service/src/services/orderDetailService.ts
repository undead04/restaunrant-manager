import { plainToInstance } from "class-transformer";
import { IOrderDetailRepository } from "./repository/interface/IOrderDetailRepository";
import { orderDetailRepository } from "./repository/orderDetailRepository";
import { IOrderDetailFilter } from "../models/IOrderDetailFIlter";
import { OrderDetail } from "../entities/OrderDetaill";
import { OrderDetailDTO } from "src/models/OrderDetailDTO";
import CustomError from "@shares/models/CustomerError";
export class orderDetailService {
  protected repository: IOrderDetailRepository;
  constructor() {
    this.repository = new orderDetailRepository();
  }
  async getFilter(filter: IOrderDetailFilter): Promise<OrderDetail[]> {
    const data = await this.repository.filter(filter);
    return data;
  }
  async create(data: OrderDetailDTO) {
    const model: OrderDetail = plainToInstance(OrderDetail, {
      ...data,
    });
    await this.repository.create(model);
  }
  async update(id: number, data: OrderDetailDTO): Promise<void> {
    const record = await this.getById(id);
    const model: OrderDetail = plainToInstance(OrderDetail, {
      ...data,
    });
    await this.repository.update(record, model);
  }
  async remove(id: number): Promise<void> {
    await this.getById(id);
    await this.repository.delete(id);
  }
  async getById(id: number): Promise<OrderDetail> {
    const data = await this.repository.getById(id);
    if (data == null) {
      throw new CustomError(
        404,
        `Không tìm thấy hóa đơn chi tiết có id = ${id}`
      );
    }
    return data;
  }
}
