import { Order } from "../../../entities/Orders";
import { IRepository } from "@shares/models/IRepository";
import { IOrderFilter } from "../../../models/IOrderFilter";

export interface IOrderRepository extends IRepository<Order> {
  filter(filter: IOrderFilter): Promise<Order[]>;
}
