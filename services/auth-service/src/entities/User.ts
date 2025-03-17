import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from "typeorm";
import { Role } from "./Role";
export enum statusUser {
  complete,
  ban,
}
@Entity()
@Index("user-fulltext", ["username", "email", "phone"], { fulltext: true })
@Index("user-index", ["role"])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "nvarchar", length: 255 })
  urlImage!: string;

  @Column({ type: "nvarchar", length: 255 })
  address!: string;

  @Column({ type: "nvarchar", length: 255, unique: true })
  codeUser!: string;

  @Column({ type: "nvarchar", length: 255, unique: true })
  username!: string;

  @Column({ type: "nvarchar", length: 255 })
  password_hash!: string;

  @Column({ type: "nvarchar", length: 100, unique: true })
  email!: string;

  @Column({ type: "nvarchar", length: 15, nullable: true })
  phone!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;
  @ManyToOne(() => Role, (role) => role.users, {
    nullable: true,
  })
  role!: Role;
}
