import { CategoryDish } from "../../../entities/CategoryDish";
import { IRepository } from "@shares/models/IRepository";
import { ICategoryDishFilter } from "../../../models/ICategoryDishFilter";
export interface ICategoryDishRepository extends IRepository<CategoryDish> {
  filter(filter: ICategoryDishFilter): Promise<CategoryDish[]>;
}
