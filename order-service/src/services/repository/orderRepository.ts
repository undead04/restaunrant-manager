import { Repository } from "typeorm";
import { IOrderRepository } from "./interface/IOrderRepository";
import { Order } from "../../entities/Orders";
import { IOrderFilter } from "../../models/IOrderFilter";
import { TypeSort } from "@shares/models/IFilter";
import { AppDataSource } from "../../database";

export class orderRepository implements IOrderRepository {
  protected repository: Repository<Order>;
  constructor() {
    this.repository = AppDataSource.getRepository(Order);
  }
  async filter(filter: IOrderFilter): Promise<Order[]> {
    const { search, page, pageSize, sort, orderBy } = filter;
    const queryBuilder = await this.repository.createQueryBuilder();
    if (search) {
      queryBuilder.where(
        "to_tsvector('english', 'order'.name) @@ to_tsquery('english', :search)",
        { search }
      );
    }
    if (orderBy) {
      queryBuilder.orderBy(
        `order.${orderBy}`,
        sort == TypeSort.ASC ? "ASC" : "DESC"
      );
    }
    if (page && pageSize) {
      queryBuilder.limit(page).offset((page - 1) * pageSize);
    }
    return queryBuilder.getMany();
  }
  async create(item: Order): Promise<Order> {
    const newRecord = this.repository.create(item);
    const data = await this.repository.save(newRecord);
    return data;
  }
  async getById(id: number): Promise<Order | null> {
    const record = await this.repository.findOne({
      where: { id: id },
    });
    return record;
  }
  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
  async getAll(): Promise<Order[] | null> {
    return await this.repository.find({});
  }
  async update(record: Order, item: Partial<Order>): Promise<void> {
    Object.assign(record, item);
    await this.repository.save(record);
  }
  async getByField(
    values: string | number,
    column: string
  ): Promise<Order | null> {
    const record = await this.repository.findOne({
      where: { [column]: values }, // Cú pháp đúng
    });
    return record;
  }
}
