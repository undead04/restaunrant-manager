import { User } from "entities/User";
import { IRepository } from "../../../models/IRepository";
import { IUserFilter } from "models/filterUser";
export interface IUserRepository extends IRepository<User> {
  filter(filter: IUserFilter): Promise<User[]>;
}
