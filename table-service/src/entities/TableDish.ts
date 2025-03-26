import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TableDish {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", unique: true })
  nameTable!: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;
}
