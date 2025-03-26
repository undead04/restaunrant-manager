import CustomError from "@shares/models/CustomerError";
import { plainToInstance } from "class-transformer";
import { IUserRepository } from "./repository/interface/IUserRepository";
import { userRepository } from "./repository/userRepository";
import { IUserFilter } from "../models/filterUser";
import { User } from "../entities/User";
import { UserDTO } from "../models/UserDTO";
import { hashPassword } from "../utils/hashPassword";
import { roleRepository } from "./repository/roleRepository";
export class userService {
  protected repository: IUserRepository;
  protected roleRepo: roleRepository;
  constructor() {
    this.repository = new userRepository();
    this.roleRepo = new roleRepository();
  }
  async getFilter(filter: IUserFilter): Promise<User[]> {
    const data = await this.repository.filter(filter);
    return data;
  }
  protected async isUnique(column: string, values: string) {
    const user = await this.repository.getByField(values, column);
    if (user) {
      return user;
    }
  }
  protected async validate(id: number, data: UserDTO) {
    const roleRecord = await this.roleRepo.getById(data.role);
    if (roleRecord == null) {
      throw new CustomError(
        400,
        `Không tìm thấy vai trò có id = ${data.role}`,
        "role"
      );
    }
    // Kiểm tra tên thể loại có trùng hay không
    const validColumn = [
      {
        column: "username",
        value: data.username,
      },
      {
        column: "email",
        value: data.email,
      },
      {
        column: "codeUser",
        value: data.codeUser,
      },
    ];
    for (let i = 0; i < validColumn.length; i++) {
      const column = validColumn[i];
      const record = await this.isUnique(column.column, column.value);
      if (record && record.id !== id) {
        throw new CustomError(
          400,
          `${column.column} = ${column.value} đã tồn tại`,
          `${column.column}`
        );
      }
    }
  }
  async create(data: UserDTO): Promise<void> {
    await this.validate(0, data);
    const model: User = plainToInstance(User, {
      ...data,
      password_hash: await hashPassword(data.password),
      role: { id: data.role },
    });
    console.log(model);
    await this.repository.create(model);
  }
  async update(id: number, data: UserDTO): Promise<void> {
    const record = await this.getById(id);
    await this.validate(id, data);
    const model: User = plainToInstance(User, {
      ...data,
      password_hash: await hashPassword(data.password),
      role: { id: data.role },
    });
    await this.repository.update(record, model);
  }
  async remove(id: number): Promise<void> {
    await this.getById(id);
    await this.repository.delete(id);
  }
  async getById(id: number): Promise<User> {
    const data = await this.repository.getById(id);
    if (data == null) {
      throw new CustomError(404, `Không tìm thấy người dùng này ${id}`);
    }
    return data;
  }
}
