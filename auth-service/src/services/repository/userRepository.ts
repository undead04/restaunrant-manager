import { User } from "../../entities/User";
import { Repository } from "typeorm";
import { IUserRepository } from "./interface/IUserRepository";
import { AppDataSource } from "../../database";
import { IUserFilter } from "../../models/filterUser";
import { TypeSort } from "@shares/models/IFilter";

export class userRepository implements IUserRepository {
  protected repository: Repository<User>;
  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }
  async filter(filter: IUserFilter): Promise<User[]> {
    const { search, sort, orderBy } = filter;
    const page = filter.page ? Number(filter.page) : 1;
    const pageSize = filter.pageSize ? Number(filter.pageSize) : 10;
    const queryBuilder = await this.repository.createQueryBuilder("user");
    if (search) {
      queryBuilder.where(
        "to_tsvector('english', 'role'.name) @@ to_tsquery('english', :search)",
        { search }
      );
    }
    if (orderBy) {
      queryBuilder.orderBy(
        `"user".${orderBy}`,
        sort == TypeSort.ASC ? "ASC" : "DESC"
      );
    }
    if (page && pageSize) {
      queryBuilder.offset((page - 1) * pageSize).limit(pageSize);
    }
    console.log(queryBuilder.getSql());

    return queryBuilder.getMany();
  }
  async create(item: User): Promise<void> {
    const newRecord = this.repository.create(item);
    console.log(newRecord);
    await this.repository.save(newRecord);
  }
  async getById(id: number): Promise<User | null> {
    const record = await this.repository.findOne({
      where: { id: id }, // Điều kiện tìm kiếm
      relations: ["role", "role.permissions"], // Các mối quan hệ cần lấy
    });
    return record;
  }
  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
  async getAll(): Promise<User[] | null> {
    return await this.repository.find({});
  }
  async update(record: User, item: Partial<User>): Promise<void> {
    Object.assign(record, item); // Gán trực tiếp
    await this.repository.save(record);
  }

  async getByField(
    values: string | number,
    column: string
  ): Promise<User | null> {
    const record = await this.repository.findOne({
      where: { [column]: values }, // Cú pháp đúng
      relations: ["role", "role.permissions"],
    });
    return record;
  }
}
