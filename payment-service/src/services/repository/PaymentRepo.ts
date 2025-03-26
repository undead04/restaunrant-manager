import { Repository } from "typeorm";
import { IPaymentRepo } from "./interface/IPaymentRepo";
import { Payment } from "../../entities/Payment";
import { AppDataSource } from "../../../src/database";
import { IPaymentFilter } from "../../models/IPaymentFilter";
import { TypeSort } from "@shares/models/IFilter";
export class PaymentRepo implements IPaymentRepo {
  protected repository: Repository<Payment>;
  constructor() {
    this.repository = AppDataSource.getRepository(Payment);
  }
  async filter(filter: IPaymentFilter): Promise<Payment[]> {
    const { from, to, sort, orderBy } = filter;
    const page = filter.page ? Number(filter.page) : 1;
    const pageSize = filter.pageSize ? Number(filter.pageSize) : 10;
    const queryBuilder = await this.repository.createQueryBuilder();
    if (from) {
      queryBuilder.where("payment.created_at >= :from", { from });
    }
    if (to) {
      queryBuilder.andWhere("payment.created_at <= :to", { to });
    }
    if (orderBy) {
      queryBuilder.orderBy(
        `payment.${orderBy}`,
        sort == TypeSort.ASC ? "ASC" : "DESC"
      );
    }
    if (page && pageSize) {
      queryBuilder.limit(page).offset((page - 1) * pageSize);
    }
    return queryBuilder.getMany();
  }
  async create(item: Payment): Promise<void> {
    const newRecord = this.repository.create(item);
    await this.repository.save(newRecord);
  }
  async getById(id: number): Promise<Payment | null> {
    const record = await this.repository.findOne({
      where: { id: id },
    });
    return record;
  }
  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
  async getAll(): Promise<Payment[] | null> {
    return await this.repository.find({});
  }
  async update(record: Payment, item: Partial<Payment>): Promise<void> {
    Object.assign(record, item);
    await this.repository.save(record);
  }
  async getByField(
    values: string | number,
    column: string
  ): Promise<Payment | null> {
    const record = await this.repository.findOne({
      where: { [column]: values }, // Cú pháp đúng
    });
    return record;
  }
}
