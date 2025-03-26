import { IRepository } from "@shares/models/IRepository";
import { OrderDetail } from "../../../entities/OrderDetaill";
import { IOrderDetailFilter } from "../../../models/IOrderDetailFIlter";
export interface IOrderDetailRepository extends IRepository<OrderDetail> {
  filter(filter: IOrderDetailFilter): Promise<OrderDetail[] | []>;
}
