import { Permission } from "../entities/Permission";
import { permissionRepository } from "./repository/permissionRepository";

export class permissionService {
  protected repository;
  constructor() {
    this.repository = new permissionRepository();
  }
  async getAll(): Promise<Permission[] | null> {
    return await this.repository.getAll();
  }
}
