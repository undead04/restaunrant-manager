import { Repository } from "typeorm";
import { IOrderDetailRepository } from "./interface/IOrderDetailRepository";
import { OrderDetail } from "../../entities/OrderDetaill";
import { AppDataSource } from "../../database";
import { IOrderDetailFilter } from "../../models/IOrderDetailFIlter";
import { TypeSort } from "@shares/models/IFilter";

export class orderDetailRepository implements IOrderDetailRepository {
  protected repository: Repository<OrderDetail>;
  constructor() {
    this.repository = AppDataSource.getRepository(OrderDetail);
  }
  async filter(filter: IOrderDetailFilter): Promise<OrderDetail[]> {
    const { search, page, pageSize, sort, orderBy } = filter;
    const queryBuilder = await this.repository.createQueryBuilder();
    if (search) {
      queryBuilder.where(
        "to_tsvector('english', 'orderDetail'.name) @@ to_tsquery('english', :search)",
        { search }
      );
    }
    if (orderBy) {
      queryBuilder.orderBy(
        `orderDetail.${orderBy}`,
        sort == TypeSort.ASC ? "ASC" : "DESC"
      );
    }
    if (page && pageSize) {
      queryBuilder.limit(page).offset((page - 1) * pageSize);
    }
    return queryBuilder.getMany();
  }

  async create(item: OrderDetail): Promise<void> {
    const newRecord = this.repository.create(item);
    await this.repository.save(newRecord);
  }
  async getById(id: number): Promise<OrderDetail | null> {
    const record = await this.repository.findOneBy({ id: id });
    return record;
  }
  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
  async getAll(): Promise<OrderDetail[] | null> {
    return await this.repository.find({});
  }
  async update(record: OrderDetail, item: Partial<OrderDetail>): Promise<void> {
    Object.assign(record, item);
    await this.repository.save(record);
  }
  async getByField(
    values: string | number,
    column: string
  ): Promise<OrderDetail | null> {
    const record = await this.repository.findOne({
      where: { [column]: values }, // Cú pháp đúng
    });
    return record;
  }
}
