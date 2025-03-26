import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { AppDataSource } from "./database";
import express from "express";
import { errorHandler } from "./middlewares/errorHandle";
dotenv.config();
import amqp from "amqplib";

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
app.use(errorHandler);
const receiveOrder = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const queue = "orders";
  await channel.assertQueue(queue, { durable: true });

  console.log("Kitchen Service is waiting for orders...");

  channel.consume(queue, (msg) => {
    if (msg) {
      const order = JSON.parse(msg.content.toString());
      console.log(`Processing order: ${order.orderId}`);

      // Giả lập chế biến món ăn
      setTimeout(() => {
        console.log(`Order ${order.orderId} is ready!`);
        channel.ack(msg);
      }, 5000);
    }
  });
};

receiveOrder().catch(console.error);

const port = 4005;
app.listen(port, () =>
  console.log("Auth Service running on port 4001", `http://localhost:${port}`)
);
