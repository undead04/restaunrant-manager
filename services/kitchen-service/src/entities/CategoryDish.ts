import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Dist } from "./Dist";

@Entity()
export class CategoryDist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255, unique: true })
  name!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;
  @OneToMany(() => Dist, (dist) => dist.categoryDist)
  dists!: Dist[];
}
