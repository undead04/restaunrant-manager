import dotenv from "dotenv";
dotenv.config();

export const databasePostConfig = {
  db_name: process.env.DB_POST_NAME,
  db_port: process.env.DB_POST_PORT,
  db_user: process.env.DB_POST_USER,
  db_password: process.env.DB_POST_PASSWORD,
  db_host: process.env.DB_POST_HOST,
};
export const databaseMongoConfig = {
  db_host: process.env.DB_MONGO_HOST,
  db_post: process.env.DB_MONGO_POST,
  db_name: process.env.DB_MONGO_NAME,
};
