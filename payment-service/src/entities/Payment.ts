import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
export enum methodPaymentStatus {
  cash = "cash",
  transfer = "transfer",
}
@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: "float" })
  totalPrice!: number;
  @Column({ type: "enum", enum: methodPaymentStatus })
  methodPaymentStatus!: methodPaymentStatus;
  @Column({ type: "varchar" })
  username!: string;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;
}
