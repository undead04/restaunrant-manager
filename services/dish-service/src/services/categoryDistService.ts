import CustomError from "../../../../shared/Errors/CustomerError";
import { plainToInstance } from "class-transformer";
import { ICategoryDistRepository } from "./repository/interface/ICategoryDistRepository";
import { categoryDistRepository } from "./repository/categoryDistRepository";
import { ICategoryDistFilter } from "../models/ICategoryDistFilter";
import { CategoryDist } from "../entities/CategoryDish";
import { CategoryDistDTO } from "models/CategoryDistDTO";

export class categoryDistService {
  protected repository: ICategoryDistRepository;
  constructor() {
    this.repository = new categoryDistRepository();
  }
  async getFilter(filter: ICategoryDistFilter): Promise<CategoryDist[]> {
    const data = await this.repository.filter(filter);
    return data;
  }
  protected async isUnique(name: string) {
    const data = await this.repository.getByField(name, "name");
    if (data) {
      return data;
    }
  }
  protected async validate(id: number, data: CategoryDistDTO) {
    // Kiểm tra tên thể loại có trùng hay không
    const record = await this.isUnique(data.name);
    if (record && record.id !== id) {
      throw new CustomError(
        400,
        `Tên thể loại đồ ăn ${data.name} đã tồn tại`,
        "name"
      );
    }
  }
  async create(data: CategoryDistDTO): Promise<void> {
    await this.validate(0, data);
    const model: CategoryDist = plainToInstance(CategoryDist, {
      ...data,
    });
    await this.repository.create(model);
  }
  async update(id: number, data: CategoryDistDTO): Promise<void> {
    await this.validate(id, data);
    const model: Partial<CategoryDist> = {
      ...data,
    };
    await this.repository.update(id, model);
  }
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
  async getById(id: number): Promise<CategoryDist | null> {
    const data = await this.repository.getById(id);
    return data;
  }
}
