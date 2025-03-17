import { IRepository } from "../../../../../../shared/database/IRepository";
import { Dist } from "../../../entities/Dist";
import { IDistFilter } from "../../../models/IDistFilter";
export interface IDistRepository extends IRepository<Dist> {
  filter(filter: IDistFilter): Promise<Dist[]>;
}
