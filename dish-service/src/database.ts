import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mongodb",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || "restaurant-manager",
  entities: ["src/entities/*.ts"],
  logging: true,
  synchronize: false,
  useUnifiedTopology: true,
});
