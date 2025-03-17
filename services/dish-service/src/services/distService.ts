import CustomError from "../../../../shared/Errors/CustomerError";
import { plainToInstance } from "class-transformer";
import { IDistRepository } from "./repository/interface/IDistRepository";
import { distRepository } from "./repository/userRepository";
import { IDistFilter } from "../models/IDistFilter";
import { Dist } from "../entities/Dist";
import { DistDTO } from "models/DistDTO";
export class distService {
  protected repository: IDistRepository;
  constructor() {
    this.repository = new distRepository();
  }
  async getFilter(filter: IDistFilter): Promise<Dist[]> {
    const data = await this.repository.filter(filter);
    return data;
  }
  protected async isUnique(name: string) {
    const dist = await this.repository.getByField(name, "name");
    if (dist) {
      return dist;
    }
  }
  protected async validate(id: number, data: DistDTO) {
    // Kiểm tra tên thể loại có trùng hay không
    const record = await this.isUnique(data.name);
    if (record && record.id !== id) {
      throw new CustomError(400, `Tên đồ ăn ${data.name} đã tồn tại`, "name");
    }
  }
  async create(data: DistDTO): Promise<void> {
    await this.validate(0, data);
    const model: Dist = plainToInstance(Dist, {
      ...data,
      categoryDist: { id: data.categoryDist },
    });
    await this.repository.create(model);
  }
  async update(id: number, data: DistDTO): Promise<void> {
    await this.validate(id, data);
    const model: Dist = plainToInstance(Dist, {
      ...data,
      categoryDist: { id: data.categoryDist },
    });
    await this.repository.update(id, model);
  }
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
  async getById(id: number): Promise<Dist | null> {
    const data = await this.repository.getById(id);
    return data;
  }
}
