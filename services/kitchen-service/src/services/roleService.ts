import { IRoleRepository } from "./repository/interface/IRoleRepository";
import { roleRepository } from "./repository/roleRepository";
import { IRoleFilter } from "../models/filterRole";
import { Role } from "../entities/Role";
import CustomError from "../../../../shared/Errors/CustomerError";
import { roleDTO } from "../models/roleDTO";
import { plainToInstance } from "class-transformer";
import { Permission } from "../entities/Permission";
export class roleService {
  protected repository: IRoleRepository;
  constructor() {
    this.repository = new roleRepository();
  }
  async getFilter(filter: IRoleFilter): Promise<Role[]> {
    const data = await this.repository.filter(filter);
    return data;
  }
  protected async isUnique(name: string) {
    const data = await this.repository.getByField(name, "name");
    if (data) {
      return data;
    }
  }
  protected async validate(id: number, data: roleDTO) {
    // Kiểm tra tên thể loại có trùng hay không
    const record = await this.isUnique(data.name);
    if (record && record.id !== id) {
      throw new CustomError(400, `Tên vai trò ${data.name} đã tồn tại`, "name");
    }
  }
  async create(data: roleDTO): Promise<void> {
    await this.validate(0, data);
    const model: Role = plainToInstance(Role, {
      name: data.name,
      description: data.description,
      permissions: data.permissions.map(
        (per) =>
          ({
            id: per,
          } as Permission)
      ),
    });
    await this.repository.create(model);
  }
  async update(id: number, data: roleDTO): Promise<void> {
    await this.validate(id, data);
    const model: Partial<Role> = {
      name: data.name,
      description: data.description,
      permissions: data.permissions.map(
        (per) =>
          ({
            id: per,
          } as Permission)
      ),
    };
    await this.repository.update(id, model);
  }
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
  async getById(id: number): Promise<Role | null> {
    const data = await this.repository.getById(id);
    return data;
  }
}
