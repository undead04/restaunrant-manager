import { IRepository } from "@shares/models/IRepository";
import { TableDish } from "../../../entities/TableDish";
import { ITableDishFiler } from "../../../models/ITableDishFilter";
export interface ITableRepository extends IRepository<TableDish> {
  filter(filter: ITableDishFiler): Promise<TableDish[]>;
}
