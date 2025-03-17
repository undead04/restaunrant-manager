import { Repository } from "typeorm";
import { IRoleRepository } from "./interface/IRoleRepository";
import { Role } from "../../entities/Role";
import { AppDataSource } from "../../database";
import { IRoleFilter } from "../../models/filterRole";
import { TypeSort } from "../../../../../shared/models/IFilter";
import CustomError from "../../../../../shared/Errors/CustomerError";

export class roleRepository implements IRoleRepository {
  protected repository: Repository<Role>;
  constructor() {
    this.repository = AppDataSource.getRepository(Role);
  }
  async filter(filter: IRoleFilter): Promise<Role[]> {
    const { search, page, pageSize, sort, orderBy } = filter;
    const queryBuilder = await this.repository.createQueryBuilder();
    if (search) {
      queryBuilder.where(
        `
                    MATCH (role.name) AGAINST (:name IN BOOLEAN MODE)
                `,
        { name: `*${search}*` }
      );
    }
    if (orderBy) {
      queryBuilder.orderBy(
        `user.${orderBy}`,
        sort == TypeSort.ASC ? "ASC" : "DESC"
      );
    }
    if (page && pageSize) {
      queryBuilder.limit(page).skip((page - 1) * pageSize);
    }
    return queryBuilder.getMany();
  }
  async create(item: Role): Promise<void> {
    const newRecord = this.repository.create(item);
    await this.repository.save(newRecord);
  }
  async getById(id: number): Promise<Role | null> {
    const record = await this.repository.findOne({
      where: { id: id },
      relations: ["permissions"], // Join với bảng permissions
    });
    if (record == null) {
      throw new CustomError(404, `Không tìm thấy vai trò này có id = ${id}`);
    }
    return record;
  }
  async delete(id: number): Promise<void> {
    const record = await this.getById(id);
    if (record) {
      await this.repository.remove(record);
    }
  }
  async getAll(): Promise<Role[] | null> {
    return await this.repository.find({});
  }
  async update(id: number, item: Partial<Role>): Promise<void> {
    const record = await this.getById(id);
    if (record) {
      for (const key of Object.keys(item) as (keyof Role)[]) {
        if (item[key]) {
          record[key] = item[key] as never;
        }
      }
      await this.repository.save(record);
    }
  }
  async getByField(
    values: string | number,
    column: string
  ): Promise<Role | null> {
    const record = await this.repository.findOne({
      where: { [column]: values }, // Cú pháp đúng
    });
    return record;
  }
}
