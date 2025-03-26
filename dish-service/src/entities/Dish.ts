import {
  Entity,
  Column,
  ManyToOne,
  Index,
  ObjectIdColumn,
  ObjectId,
} from "typeorm";
import { CategoryDish } from "./CategoryDish";

@Entity()
@Index("dish-fulltext", ["name", "description"], { fulltext: true })
@Index("dish-index", ["categoryDish"])
export class Dish {
  @ObjectIdColumn()
  _id!: ObjectId;

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
  @ManyToOne(() => CategoryDish, (CategoryDish) => CategoryDish.dishs)
  categoryDish!: CategoryDish;
}
