import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "./Orders";
export enum StatusDish {
  pendding = "pendding",
  inProgress = "inProgress",
  complete = "complete",
}
@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: "int" })
  dishId!: number;
  @Column({ type: "int" })
  quantity!: number;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;
  @Column({ type: "enum", enum: StatusDish, default: StatusDish.pendding })
  statusDish!: StatusDish;
  @ManyToOne(() => Order, (order) => order.orderDetails)
  order!: Order;
}
