import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { OrderDetail } from "./OrderDetaill";
export enum PaymentStatus {
  pending = "pending",
  complete = "complete",
}
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: "varchar", length: 255, unique: true })
  codeOrder!: string;
  @Column({ type: "int" })
  userId!: number;
  @Column({ type: "int" })
  tableId!: number;
  @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.pending })
  paymentStatus!: PaymentStatus;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails!: OrderDetail[];
}
