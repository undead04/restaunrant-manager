import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import { setupWebSocket } from "./websocket";
import kitchenRouter from "./routes/kitchenRouter";
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
const server = http.createServer(app);
app.use(
  cors({
    origin: "*", // Thay 'http://your-frontend-domain.com' bằng domain của bạn
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use("/kitchen", kitchenRouter);
const port = 4005;
server.listen(port, () =>
  console.log(
    `Kitchen Service running on port ${port}`,
    `http://localhost:${port}`
  )
);
setupWebSocket(server);
