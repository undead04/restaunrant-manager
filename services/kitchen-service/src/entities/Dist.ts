import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { CategoryDist } from "./CategoryDish";

@Entity()
export class Dist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255, unique: true })
  name!: string;
  @Column({ type: "nvarchar" })
  description!: string;
  @Column({ type: "nvarchar" })
  url_image!: string;
  @Column({ type: "float" })
  price!: number;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;
  @ManyToOne(() => CategoryDist, (categoryDist) => categoryDist.dists)
  categoryDist!: CategoryDist;
}
