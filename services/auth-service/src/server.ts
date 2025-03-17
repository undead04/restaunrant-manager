import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { AppDataSource } from "./database";
import express from "express";
import roleRouter from "./routes/roleRoute";
import userRouter from "./routes/userRoute";
import authRouter from "./routes/authRoute";
import permissionRouter from "./routes/permissionRoute";
import { errorHandler } from "./middlewares/errorHandle";
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
app.use("/role", roleRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/permission", permissionRouter);
app.use(errorHandler);
const port = 4001;
app.listen(port, () =>
  console.log("Auth Service running on port 4001", `http://localhost:${port}`)
);
