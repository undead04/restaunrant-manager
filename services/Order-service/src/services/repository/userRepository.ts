import { User } from "../../entities/User";
import { Repository } from "typeorm";
import { IUserRepository } from "./interface/IUserRepository";
import { AppDataSource } from "../../database";
import CustomError from "../../../../../shared/Errors/CustomerError";
import { IUserFilter } from "../../models/filterUser";
import { TypeSort } from "../../../../../shared/models/IFilter";

export class userRepository implements IUserRepository {
  protected repository: Repository<User>;
  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }
  async filter(filter: IUserFilter): Promise<User[]> {
    const { search, page, pageSize, sort, orderBy } = filter;
    const queryBuilder = await this.repository.createQueryBuilder();
    if (search) {
      queryBuilder
        .where(
          `
                MATCH (user.username) AGAINST (:name IN BOOLEAN MODE)
            `,
          { name: `*${search}*` }
        )
        .orWhere(
          `
        MATCH (user.codeUser) AGAINST (:codeUser IN BOOLEAN MODE)
    `,
          { codeUser: `*${search}*` }
        )
        .orWhere(
          `
        MATCH (user.phone) AGAINST (:phone IN BOOLEAN MODE)
    `,
          { phone: `*${search}*` }
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
  async create(item: User): Promise<void> {
    const newRecord = this.repository.create(item);
    console.log(newRecord);
    await this.repository.save(newRecord);
  }
  async getById(id: number): Promise<User | null> {
    const record = await this.repository.findOneBy({ id: id });
    if (record == null) {
      throw new CustomError(404, `Không tìm thấy người dùng có id = ${id}`);
    }
    return record;
  }
  async delete(id: number): Promise<void> {
    const record = await this.getById(id);
    if (record) {
      await this.repository.remove(record);
    }
  }
  async getAll(): Promise<User[] | null> {
    return await this.repository.find({});
  }
  async update(id: number, item: Partial<User>): Promise<void> {
    const record = await this.getById(id);
    if (record) {
      for (const key of Object.keys(item) as (keyof User)[]) {
        record[key] = item[key] as never;
      }
      return;
    }
  }
  async getByField(
    values: string | number,
    column: string
  ): Promise<User | null> {
    const record = await this.repository.findOne({
      where: { [column]: values }, // Cú pháp đúng
    });
    return record;
  }
  async getNameAndEmailAndCodeUser(
    name: string,
    email: string,
    codeUser: string
  ): Promise<User | null> {
    const data = await this.repository
      .createQueryBuilder()
      .andWhere("user.username=:name", { name })
      .orWhere("user.email=:email", { email })
      .orWhere("user.codeUser=:codeUser", { codeUser })
      .getOne();
    return data;
  }
}
