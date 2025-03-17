import { CategoryDist } from "../../../entities/CategoryDish";
import { IRepository } from "../../../../../../shared/database/IRepository";
import { ICategoryDistFilter } from "../../../models/ICategoryDistFilter";
export interface ICategoryDistRepository extends IRepository<CategoryDist> {
  filter(filter: ICategoryDistFilter): Promise<CategoryDist[]>;
}
