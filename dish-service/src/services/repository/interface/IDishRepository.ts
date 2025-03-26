import { IRepository } from "@shares/models/IRepository";
import { Dish } from "../../../entities/Dish";
import { IDishFilter } from "../../../models/IDishFilter";
export interface IDishRepository extends IRepository<Dish> {
  filter(filter: IDishFilter): Promise<Dish[]>;
}
