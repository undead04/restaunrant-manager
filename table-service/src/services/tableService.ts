import CustomError from "@shares/models/CustomerError";
import { plainToInstance } from "class-transformer";
import { ITableRepository } from "./repository/interface/ITableRepository";
import { tableRepository } from "./repository/tableRepository";
import { ITableDishFiler } from "../models/ITableDishFilter";
import { TableDish } from "../entities/TableDish";
import { TableDishDTO } from "../models/TableDishDTO";
export class tableService {
  protected repository: ITableRepository;
  constructor() {
    this.repository = new tableRepository();
  }
  async getFilter(filter: ITableDishFiler): Promise<TableDish[]> {
    const data = await this.repository.filter(filter);
    return data;
  }
  protected async isUnique(name: number) {
    const data = await this.repository.getByField(name, "nameTable");
    if (data) {
      return data;
    }
  }
  protected async validate(id: number, data: TableDishDTO) {
    // Kiểm tra tên thể loại có trùng hay không
    const record = await this.isUnique(data.nameTable);
    if (record && record.id !== id) {
      throw new CustomError(
        400,
        `Số bàn ăn đã bị trùng ${data.nameTable} đã tồn tại`,
        "name"
      );
    }
  }
  async create(data: TableDishDTO): Promise<void> {
    await this.validate(0, data);
    const model: TableDish = plainToInstance(TableDish, {
      ...data,
    });
    await this.repository.create(model);
  }
  async update(id: number, data: TableDishDTO): Promise<void> {
    const record = await this.getById(id);
    await this.validate(id, data);
    const model: Partial<TableDish> = {
      ...data,
    };
    await this.repository.update(record, model);
  }
  async remove(id: number): Promise<void> {
    await this.getById(id);
    await this.repository.delete(id);
  }
  async getById(id: number): Promise<TableDish> {
    const data = await this.repository.getById(id);
    if (data == null) {
      throw new CustomError(404, `Không tìm thấy bàn ăn này id = ${id}`);
    }
    return data;
  }
}
