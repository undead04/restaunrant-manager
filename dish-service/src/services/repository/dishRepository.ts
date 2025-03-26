import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import { TypeSort } from "@shares/models/IFilter";
import { IDishRepository } from "./interface/IDishRepository";
import { Dish } from "../../entities/Dish";
import { IDishFilter } from "../../models/IDishFilter";
import { ObjectId } from "mongodb";

export class dishRepository implements IDishRepository {
  protected repository: Repository<Dish>;
  constructor() {
    this.repository = AppDataSource.getRepository(Dish);
  }
  async filter(filter: IDishFilter): Promise<Dish[]> {
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
  async create(item: Dish): Promise<void> {
    const newRecord = this.repository.create(item);
    await this.repository.insert(newRecord);
  }
  async getById(id: string): Promise<Dish | null> {
    const objectId = new ObjectId(id);
    const record = await this.repository.findOneBy({ _id: objectId });
    return record;
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  async getAll(): Promise<Dish[] | null> {
    return await this.repository.find({});
  }
  async update(record: Dish, item: Partial<Dish>): Promise<void> {
    Object.assign(record, item); // Gán trực tiếp
    await this.repository.save(record);
  }
  async getByField(
    values: string | number,
    column: string
  ): Promise<Dish | null> {
    const record = await this.repository.findOne({
      where: { [column]: values }, // Cú pháp đúng
    });
    return record;
  }
}
