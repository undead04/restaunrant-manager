import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import CustomError from "../../../../../shared/Errors/CustomerError";
import { TypeSort } from "../../../../../shared/models/IFilter";
import { IDistRepository } from "./interface/IDistRepository";
import { Dist } from "../../entities/Dist";
import { IDistFilter } from "../../models/IDistFilter";

export class distRepository implements IDistRepository {
  protected repository: Repository<Dist>;
  constructor() {
    this.repository = AppDataSource.getRepository(Dist);
  }
  async filter(filter: IDistFilter): Promise<Dist[]> {
    const { search, page, pageSize, sort, orderBy } = filter;
    const queryBuilder = await this.repository.createQueryBuilder();
    if (search) {
      queryBuilder.where(
        `
                MATCH (dist.username) AGAINST (:name IN BOOLEAN MODE)
            `,
        { name: `*${search}*` }
      );
    }
    if (orderBy) {
      queryBuilder.orderBy(
        `dist.${orderBy}`,
        sort == TypeSort.ASC ? "ASC" : "DESC"
      );
    }
    if (page && pageSize) {
      queryBuilder.limit(page).skip((page - 1) * pageSize);
    }
    return queryBuilder.getMany();
  }
  async create(item: Dist): Promise<void> {
    const newRecord = this.repository.create(item);
    console.log(newRecord);
    await this.repository.save(newRecord);
  }
  async getById(id: number): Promise<Dist | null> {
    const record = await this.repository.findOneBy({ id: id });
    if (record == null) {
      throw new CustomError(404, `Không tìm thấy món ăn này có id = ${id}`);
    }
    return record;
  }
  async delete(id: number): Promise<void> {
    const record = await this.getById(id);
    if (record) {
      await this.repository.remove(record);
    }
  }
  async getAll(): Promise<Dist[] | null> {
    return await this.repository.find({});
  }
  async update(id: number, item: Partial<Dist>): Promise<void> {
    const record = await this.getById(id);
    if (record) {
      for (const key of Object.keys(item) as (keyof Dist)[]) {
        record[key] = item[key] as never;
      }
      return;
    }
  }
  async getByField(
    values: string | number,
    column: string
  ): Promise<Dist | null> {
    const record = await this.repository.findOne({
      where: { [column]: values }, // Cú pháp đúng
    });
    return record;
  }
}
