import { IRepository } from "../../../models/IRepository";
import { Role } from "entities/Role";
import { IRoleFilter } from "models/filterRole";
export interface IRoleRepository extends IRepository<Role> {
  filter(filter: IRoleFilter): Promise<Role[]>;
}
