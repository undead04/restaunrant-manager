import { User } from "entities/User";
import { IRepository } from "../../../../../../shared/database/IRepository";
import { IUserFilter } from "models/filterUser";
export interface IUserRepository extends IRepository<User> {
  filter(filter: IUserFilter): Promise<User[]>;
  getNameAndEmailAndCodeUser(
    name: string,
    email: string,
    codeUser: string
  ): Promise<User | null>;
}
