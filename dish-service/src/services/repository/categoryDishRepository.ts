import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import { TypeSort } from "@shares/models/IFilter";
import { ICategoryDishRepository } from "./interface/ICategoryDishRepository";
import { CategoryDish } from "../../entities/CategoryDish";
import { ICategoryDishFilter } from "../../models/ICategoryDishFilter";
import { ObjectId } from "mongodb";

export class categoryDishRepository implements ICategoryDishRepository {
  protected repository: Repository<CategoryDish>;
  constructor() {
    this.repository = AppDataSource.getRepository(CategoryDish);
  }
  async filter(filter: ICategoryDishFilter): Promise<CategoryDish[]> {
    const { search, page, pageSize, sort, orderBy } = filter;

    const query: any = {};

    // Dùng $regex cho tìm kiếm gần đúng
    if (search) {
      query["name"] = { $regex: search, $options: "i" }; // Không phân biệt hoa thường
    }

    let options: any = {
      where: query,
      order: orderBy ? { [orderBy]: sort === TypeSort.ASC ? 1 : -1 } : {},
      skip: page && pageSize ? (page - 1) * pageSize : 0,
      take: pageSize ? pageSize : undefined,
    };

    return this.repository.find(options);
  }
  async create(item: CategoryDish): Promise<void> {
    const newRecord = this.repository.create(item);
    await this.repository.insert(newRecord);
  }
  async getById(id: string): Promise<CategoryDish | null> {
    const objectId = new ObjectId(id); // Chuyển string thành ObjectId
    const record = await this.repository.findOne({
      where: { _id: objectId }, // Tìm theo _id thay vì id
    });
    return record;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  async getAll(): Promise<CategoryDish[] | null> {
    return await this.repository.find({});
  }
  async update(
    record: CategoryDish,
    item: Partial<CategoryDish>
  ): Promise<void> {
    Object.assign(record, item); // Gán trực tiếp
    await this.repository.save(record);
  }
  async getByField(
    values: string | number,
    column: string
  ): Promise<CategoryDish | null> {
    const record = await this.repository.findOne({
      where: { [column]: values }, // Cú pháp đúng
    });
    return record;
  }
}
