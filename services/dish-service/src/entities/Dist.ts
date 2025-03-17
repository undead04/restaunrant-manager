import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from "typeorm";
import { CategoryDist } from "./CategoryDish";

@Entity()
@Index("dist-fulltext", ["name", "description"], { fulltext: true })
@Index("dist-index", ["categoryDist"])
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
