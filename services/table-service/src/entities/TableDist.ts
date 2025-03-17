import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class TableDist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", unique: true })
  nameTable!: number;
  @Column({ type: "bool", default: false })
  isUse!: boolean;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;
}
