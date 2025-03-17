import { comparePassword } from "../utils/hashPassword";
import { IUserRepository } from "./repository/interface/IUserRepository";
import { userRepository } from "./repository/userRepository";
import { LoginDTO } from "../models/loginDTO";
export class authService {
  protected repository: IUserRepository;
  constructor() {
    this.repository = new userRepository();
  }
  async isLogin(model: LoginDTO) {
    const record = await this.repository.getByField(model.username, "username");

    if (record == null) {
      return null;
    }
    const isMatch = await comparePassword(model.password, record.password_hash);
    if (!isMatch) return null;
    return record;
  }
}
