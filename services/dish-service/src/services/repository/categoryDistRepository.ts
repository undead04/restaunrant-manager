import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import { TypeSort } from "../../../../../shared/models/IFilter";
import CustomError from "../../../../../shared/Errors/CustomerError";
import { ICategoryDistRepository } from "./interface/ICategoryDistRepository";
import { CategoryDist } from "../../entities/CategoryDish";
import { ICategoryDistFilter } from "../../models/ICategoryDistFilter";

export class categoryDistRepository implements ICategoryDistRepository {
  protected repository: Repository<CategoryDist>;
  constructor() {
    this.repository = AppDataSource.getRepository(CategoryDist);
  }
  async filter(filter: ICategoryDistFilter): Promise<CategoryDist[]> {
    const { search, page, pageSize, sort, orderBy } = filter;
    const queryBuilder = await this.repository.createQueryBuilder();
    if (search) {
      queryBuilder.where(
        `
                    MATCH (distCategory.name) AGAINST (:name IN BOOLEAN MODE)
                `,
        { name: `*${search}*` }
      );
    }
    if (orderBy) {
      queryBuilder.orderBy(
        `distCategory.${orderBy}`,
        sort == TypeSort.ASC ? "ASC" : "DESC"
      );
    }
    if (page && pageSize) {
      queryBuilder.limit(page).skip((page - 1) * pageSize);
    }
    return queryBuilder.getMany();
  }
  async create(item: CategoryDist): Promise<void> {
    const newRecord = this.repository.create(item);
    await this.repository.save(newRecord);
  }
  async getById(id: number): Promise<CategoryDist | null> {
    const record = await this.repository.findOne({
      where: { id: id },
    });
    if (record == null) {
      throw new CustomError(
        404,
        `Không tìm thấy thể loại đồ ăn này này có id = ${id}`
      );
    }
    return record;
  }
  async delete(id: number): Promise<void> {
    const record = await this.getById(id);
    if (record) {
      await this.repository.remove(record);
    }
  }
  async getAll(): Promise<CategoryDist[] | null> {
    return await this.repository.find({});
  }
  async update(id: number, item: Partial<CategoryDist>): Promise<void> {
    const record = await this.getById(id);
    if (record) {
      for (const key of Object.keys(item) as (keyof CategoryDist)[]) {
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
  ): Promise<CategoryDist | null> {
    const record = await this.repository.findOne({
      where: { [column]: values }, // Cú pháp đúng
    });
    return record;
  }
}
