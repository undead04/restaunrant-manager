import { IRepository } from "../../../../../../shared/database/IRepository";
import { TableDist } from "../../../entities/TableDist";
import { ITableDistFiler } from "../../../models/ITableDistFilter";
export interface ITableRepository extends IRepository<TableDist> {
  filter(filter: ITableDistFiler): Promise<TableDist[]>;
}
