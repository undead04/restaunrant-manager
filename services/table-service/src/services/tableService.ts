import CustomError from "../../../../shared/Errors/CustomerError";
import { plainToInstance } from "class-transformer";
import { ITableRepository } from "./repository/interface/ITableRepository";
import { tableRepository } from "./repository/tableRepository";
import { ITableDistFiler } from "../models/ITableDistFilter";
import { TableDist } from "../entities/TableDist";
import { TableDistDTO } from "../models/TableDistDTO";
export class tableService {
  protected repository: ITableRepository;
  constructor() {
    this.repository = new tableRepository();
  }
  async getFilter(filter: ITableDistFiler): Promise<TableDist[]> {
    const data = await this.repository.filter(filter);
    return data;
  }
  protected async isUnique(name: number) {
    const data = await this.repository.getByField(name, "nameTable");
    if (data) {
      return data;
    }
  }
  protected async validate(id: number, data: TableDistDTO) {
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
  async create(data: TableDistDTO): Promise<void> {
    await this.validate(0, data);
    const model: TableDist = plainToInstance(TableDist, {
      ...data,
    });
    await this.repository.create(model);
  }
  async update(id: number, data: TableDistDTO): Promise<void> {
    await this.validate(id, data);
    const model: Partial<TableDist> = {
      ...data,
    };
    await this.repository.update(id, model);
  }
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
  async getById(id: number): Promise<TableDistDTO | null> {
    const data = await this.repository.getById(id);
    return data;
  }
}
