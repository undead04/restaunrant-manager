import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.DB_HOST);
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "restaurant-manager",
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  logging: true,
  synchronize: false,
});
