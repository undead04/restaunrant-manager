import { AppDataSource } from "../../database";
import { Permission } from "../../entities/Permission";
import { IPermissionRepository } from "./interface/IPermissionRepository";
export class permissionRepository implements IPermissionRepository {
  protected repository;
  constructor() {
    this.repository = AppDataSource.getRepository(Permission);
  }
  create(item: Permission): Promise<void | Permission> {
    throw new Error("Method not implemented.");
  }
  getById(id: number | string): Promise<Permission | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: number | string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<Permission[] | null> {
    const data = await this.repository.find({});
    return data;
  }
  update(
    id: string | number,
    item: Partial<Permission>
  ): Promise<void | Permission> {
    throw new Error("Method not implemented.");
  }
  getByField(
    values: string | number,
    column: string
  ): Promise<Permission | null> {
    throw new Error("Method not implemented.");
  }
}
