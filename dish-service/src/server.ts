import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { AppDataSource } from "./database";
import express from "express";
import dishRouter from "./routes/DishRouter";
import categoryDishRouter from "./routes/CategoryDishRouter";
import { errorHandler } from "@shares/utils/errorHandle";
dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*", // Thay 'http://your-frontend-domain.com' bằng domain của bạn
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
AppDataSource.initialize()
  .then(() => {
    console.log("Kết nối đến cơ sở dữ liệu thành công!");
  })
  .catch((error) => {
    console.error("Lỗi khi kết nối đến cơ sở dữ liệu:", error);
  });
app.use("/categoryDish", categoryDishRouter);
app.use("/dish", dishRouter);
app.use(errorHandler);
const port = 4002;
app.listen(port, () =>
  console.log(
    `Dish Service running on port ${port}`,
    `http://localhost:${port}`
  )
);
