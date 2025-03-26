import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { AppDataSource } from "./database";
import express from "express";
import http from "http";
import orderDetailRouter from "./routes/orderDetailRouter";
import orderRouter from "./routes/orderRouter";
import { setupWebSocket } from "./websocket";
import { errorHandler } from "./middlewares/errorHandle";
import redisClient from "@shares/configs/redis";
import { Server } from "socket.io";
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
const server = http.createServer(app);

app.use("/order", orderRouter);
app.use("/orderDetail", orderDetailRouter);
app.use(errorHandler);

const port = 4004;
const expressService = app.listen(port, () =>
  console.log("Order Service running on port 4004", `http://localhost:${port}`)
);
setupWebSocket(expressService);
