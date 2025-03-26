import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import { TypeSort } from "@shares/models/IFilter";
import { ITableRepository } from "./interface/ITableRepository";
import { TableDish } from "../../entities/TableDish";
import { ITableDishFiler } from "../../models/ITableDishFilter";

export class tableRepository implements ITableRepository {
  protected repository: Repository<TableDish>;
  constructor() {
    this.repository = AppDataSource.getRepository(TableDish);
  }
  async filter(filter: ITableDishFiler): Promise<TableDish[]> {
    const { search, status, page, pageSize, sort, orderBy } = filter;
    const queryBuilder = await this.repository.createQueryBuilder();
    if (search) {
      queryBuilder.where(
        "to_tsvector('english', 'tableDish'.name) @@ to_tsquery('english', :search)",
        { search }
      );
    }
    if (orderBy) {
      queryBuilder.orderBy(
        `tableDish.${orderBy}`,
        sort == TypeSort.ASC ? "ASC" : "DESC"
      );
    }
    if (page && pageSize) {
      queryBuilder.limit(page).offset((page - 1) * pageSize);
    }
    return queryBuilder.getMany();
  }
  async create(item: TableDish): Promise<void> {
    const newRecord = this.repository.create(item);
    await this.repository.save(newRecord);
  }
  async getById(id: number): Promise<TableDish | null> {
    const record = await this.repository.findOne({
      where: { id: id },
    });
    return record;
  }
  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
  async getAll(): Promise<TableDish[] | null> {
    return await this.repository.find({});
  }
  async update(record: TableDish, item: Partial<TableDish>): Promise<void> {
    Object.assign(record, item); // Gán trực tiếp
    await this.repository.save(record);
  }
  async getByField(
    values: string | number,
    column: string
  ): Promise<TableDish | null> {
    const record = await this.repository.findOne({
      where: { [column]: values }, // Cú pháp đúng
    });
    return record;
  }
}
