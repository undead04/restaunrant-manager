import { IsNotEmpty } from "class-validator";
import { OrderDetail } from "../entities/OrderDetaill";

export class OrderDTO {
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  tableId: number;
  orderDetails: {
    dishId: string;
    quantity: number;
  }[];
  constructor(data: OrderDTO) {
    this.userId = data.userId;
    this.tableId = data.tableId;
    this.orderDetails = data.orderDetails;
  }
}
export interface IOrderRes {
  id: number;
  codeOrder: string;
  user: {
    id: number;
    username: string;
  };
  table: {
    id: string;
    nameTable: number;
  };
  created_at: Date;
  orderDetails?: OrderDetail[];
}
