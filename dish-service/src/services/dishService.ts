import CustomError from "@shares/models/CustomerError";
import { plainToInstance } from "class-transformer";
import { IDishRepository } from "./repository/interface/IDishRepository";
import { dishRepository } from "./repository/dishRepository";
import { IDishFilter } from "../models/IDishFilter";
import { Dish } from "../entities/Dish";
import { DishDTO } from "../models/DishDTO";
import { ObjectId } from "mongodb";
import { categoryDishRepository } from "./repository/categoryDishRepository";
export class dishService {
  protected repository: IDishRepository;
  protected categoryRepo;
  constructor() {
    this.repository = new dishRepository();
    this.categoryRepo = new categoryDishRepository();
  }
  async getFilter(filter: IDishFilter): Promise<Dish[]> {
    const data = await this.repository.filter(filter);
    return data;
  }
  protected async isUnique(name: string) {
    const dish = await this.repository.getByField(name, "name");
    if (dish) {
      return dish;
    }
  }
  protected async validate(id: string, data: DishDTO) {
    // Kiểm tra tên thể loại có trùng hay không
    const recordCategory = await this.categoryRepo.getById(data.categoryDish);
    if (recordCategory == null) {
      throw new CustomError(
        400,
        `Không tồn tại thể loại đồ ăn có id = ${data.categoryDish}`,
        "categoryDish"
      );
    }
    const record = await this.isUnique(data.name);
    const objectId = id ? new ObjectId(id) : "";
    if (record && !record._id.equals(objectId)) {
      throw new CustomError(400, `Tên đồ ăn ${data.name} đã tồn tại`, "name");
    }
  }
  async create(data: DishDTO): Promise<void> {
    await this.validate("", data);
    const model: Dish = plainToInstance(Dish, {
      ...data,
      categoryDish: { id: data.categoryDish },
    });
    await this.repository.create(model);
  }
  async update(id: string, data: DishDTO): Promise<void> {
    const record = await this.getById(id);
    await this.validate(id, data);
    const model: Dish = plainToInstance(Dish, {
      ...data,
      categoryDish: { id: data.categoryDish },
    });
    await this.repository.update(record, model);
  }
  async remove(id: string): Promise<void> {
    await this.getById(id);
    await this.repository.delete(id);
  }
  async getById(id: string): Promise<Dish> {
    const data = await this.repository.getById(id);
    if (data == null) {
      throw new CustomError(404, `Không tìm thấy món ăn id = ${id}`);
    }
    return data;
  }
}
