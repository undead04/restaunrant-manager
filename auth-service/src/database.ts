import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "restaurant-manager",
  entities: [__dirname + "/entities/*.ts"],
  migrations: [__dirname + "/migrations/*.ts"],
  logging: true,
  synchronize: false,
});
