import { Repository } from "typeorm";
import { IRoleRepository } from "./interface/IRoleRepository";
import { Role } from "../../entities/Role";
import { AppDataSource } from "../../database";
import { IRoleFilter } from "../../models/filterRole";
import { TypeSort } from "@shares/models/IFilter";

export class roleRepository implements IRoleRepository {
  protected repository: Repository<Role>;
  constructor() {
    this.repository = AppDataSource.getRepository(Role);
  }
  async filter(filter: IRoleFilter): Promise<Role[]> {
    const { search, sort, orderBy } = filter;
    const page = filter.page ? Number(filter.page) : 1;
    const pageSize = filter.pageSize ? Number(filter.pageSize) : 10;
    const queryBuilder = await this.repository.createQueryBuilder("role");
    if (search) {
      queryBuilder.where(
        "to_tsvector('english', role.name) @@ to_tsquery('english', :search)",
        { search }
      );
    }
    if (orderBy) {
      queryBuilder.orderBy(
        `role.${orderBy}`,
        sort == TypeSort.ASC ? "ASC" : "DESC"
      );
    }
    if (page && pageSize) {
      queryBuilder.offset((page - 1) * pageSize).limit(pageSize);
    }

    return queryBuilder.getMany();
  }
  async create(item: Role): Promise<Role> {
    const newRecord = this.repository.create(item);
    return await this.repository.save(newRecord);
  }
  async getById(id: number): Promise<Role | null> {
    const record = await this.repository
      .createQueryBuilder("role")
      .innerJoinAndSelect("role.permissions", "permission")
      .andWhere("role.id=:id", { id })
      .select([
        "role.id",
        "role.name",
        "role.description",
        "role.created_at",
        "permission.id",
        "permission.name",
      ])
      .getOne();
    return record;
  }
  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
  async getAll(): Promise<Role[] | null> {
    return await this.repository.find({});
  }
  async update(record: Role, item: Partial<Role>): Promise<void> {
    Object.assign(record, item); // Gán trực tiếp
    await this.repository.save(record);
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
