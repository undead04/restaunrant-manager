import CustomError from "../../../../shared/Errors/CustomerError";
import { plainToInstance } from "class-transformer";
import { IUserRepository } from "./repository/interface/IUserRepository";
import { userRepository } from "./repository/userRepository";
import { IUserFilter } from "../models/filterUser";
import { User } from "../entities/User";
import { UserDTO } from "../models/UserDTO";
import { hashPassword } from "../utils/hashPassword";
export class userService {
  protected repository: IUserRepository;
  constructor() {
    this.repository = new userRepository();
  }
  async getFilter(filter: IUserFilter): Promise<User[]> {
    const data = await this.repository.filter(filter);
    return data;
  }
  protected async isUnique(username: string, email: string, codeUser: string) {
    const user = await this.repository.getNameAndEmailAndCodeUser(
      username,
      email,
      codeUser
    );
    if (user) {
      return user;
    }
  }
  protected async validate(id: number, data: UserDTO) {
    // Kiểm tra tên thể loại có trùng hay không
    const record = await this.isUnique(
      data.username,
      data.email,
      data.codeUser
    );
    if (record && record.id !== id) {
      throw new CustomError(
        400,
        `Tên người dùng hoặc email hoặc codeUser ${data.username} đã tồn tại`,
        "name"
      );
    }
  }
  async create(data: UserDTO): Promise<void> {
    await this.validate(0, data);
    const model: User = plainToInstance(User, {
      ...data,
      password_hash: hashPassword(data.password),
      role: { id: data.role },
    });
    await this.repository.create(model);
  }
  async update(id: number, data: UserDTO): Promise<void> {
    await this.validate(id, data);
    const model: User = plainToInstance(User, {
      ...data,
      password_hash: hashPassword(data.password),
      role: { id: data.role },
    });
    await this.repository.update(id, model);
  }
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
  async getById(id: number): Promise<User | null> {
    const data = await this.repository.getById(id);
    return data;
  }
}
