import { Entity, Column, OneToMany, ObjectIdColumn, ObjectId } from "typeorm";
import { Dish } from "./Dish";

@Entity()
export class CategoryDish {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column({ type: "varchar", length: 255, unique: true })
  name!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;
  @OneToMany(() => Dish, (dish) => dish.categoryDish)
  dishs!: Dish[];
}
