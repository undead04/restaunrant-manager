import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import { TypeSort } from "../../../../../shared/models/IFilter";
import CustomError from "../../../../../shared/Errors/CustomerError";
import { ITableRepository } from "./interface/ITableRepository";
import { TableDist } from "../../entities/TableDist";
import { ITableDistFiler } from "../../models/ITableDistFilter";

export class tableRepository implements ITableRepository {
  protected repository: Repository<TableDist>;
  constructor() {
    this.repository = AppDataSource.getRepository(TableDist);
  }
  async filter(filter: ITableDistFiler): Promise<TableDist[]> {
    const { search, status, page, pageSize, sort, orderBy } = filter;
    const queryBuilder = await this.repository.createQueryBuilder();
    if (search) {
      queryBuilder.where(
        `
                    MATCH (tableDist.name) AGAINST (:name IN BOOLEAN MODE)
                `,
        { name: `*${search}*` }
      );
    }
    if (status) {
      queryBuilder.andWhere("tableDist.isUse=:status", { status });
    }
    if (orderBy) {
      queryBuilder.orderBy(
        `user.${orderBy}`,
        sort == TypeSort.ASC ? "ASC" : "DESC"
      );
    }
    if (page && pageSize) {
      queryBuilder.limit(page).skip((page - 1) * pageSize);
    }
    return queryBuilder.getMany();
  }
  async create(item: TableDist): Promise<void> {
    const newRecord = this.repository.create(item);
    await this.repository.save(newRecord);
  }
  async getById(id: number): Promise<TableDist | null> {
    const record = await this.repository.findOne({
      where: { id: id },
    });
    if (record == null) {
      throw new CustomError(404, `Không tìm thấy bàn này này có id = ${id}`);
    }
    return record;
  }
  async delete(id: number): Promise<void> {
    const record = await this.getById(id);
    if (record) {
      await this.repository.remove(record);
    }
  }
  async getAll(): Promise<TableDist[] | null> {
    return await this.repository.find({});
  }
  async update(id: number, item: Partial<TableDist>): Promise<void> {
    const record = await this.getById(id);
    if (record) {
      for (const key of Object.keys(item) as (keyof TableDist)[]) {
        if (item[key]) {
          record[key] = item[key] as never;
        }
      }
      await this.repository.save(record);
    }
  }
  async getByField(
    values: string | number,
    column: string
  ): Promise<TableDist | null> {
    const record = await this.repository.findOne({
      where: { [column]: values }, // Cú pháp đúng
    });
    return record;
  }
}
