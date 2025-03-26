import CustomError from "@shares/models/CustomerError";
import { plainToInstance } from "class-transformer";
import { ICategoryDishRepository } from "./repository/interface/ICategoryDishRepository";
import { categoryDishRepository } from "./repository/categoryDishRepository";
import { ICategoryDishFilter } from "../models/ICategoryDishFilter";
import { CategoryDish } from "../entities/CategoryDish";
import { CategoryDishDTO } from "../models/CategoryDishDTO";
import { ObjectId } from "mongodb";

export class categoryDishService {
  protected repository: ICategoryDishRepository;
  constructor() {
    this.repository = new categoryDishRepository();
  }
  async getFilter(filter: ICategoryDishFilter): Promise<CategoryDish[]> {
    const data = await this.repository.filter(filter);
    return data;
  }
  protected async isUnique(name: string) {
    const data = await this.repository.getByField(name, "name");
    if (data) {
      return data;
    }
  }
  protected async validate(id: string, data: CategoryDishDTO) {
    // Kiểm tra tên thể loại có trùng hay không
    const record = await this.isUnique(data.name);
    const objectId = id ? new ObjectId(id) : "";
    console.log(record?._id, objectId);
    if (record && !record._id.equals(objectId)) {
      throw new CustomError(
        400,
        `Tên thể loại đồ ăn ${data.name} đã tồn tại`,
        "name"
      );
    }
  }
  async create(data: CategoryDishDTO): Promise<void> {
    await this.validate("", data);
    const model: CategoryDish = plainToInstance(CategoryDish, {
      ...data,
    });
    await this.repository.create(model);
  }
  async update(id: string, data: CategoryDishDTO): Promise<void> {
    const record = await this.getById(id);
    await this.validate(id, data);
    const model: Partial<CategoryDish> = {
      ...data,
    };
    await this.repository.update(record, model);
  }
  async remove(id: string): Promise<void> {
    await this.repository.getById(id);
    await this.repository.delete(id);
  }
  async getById(id: string): Promise<CategoryDish> {
    const data = await this.repository.getById(id);
    if (data == null) {
      throw new CustomError(
        404,
        `Không tìm thấy thể loại của món ăn có id = ${id}`
      );
    }
    return data;
  }
}
