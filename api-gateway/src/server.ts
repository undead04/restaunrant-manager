import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import router from "routes";
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
app.use("/", router);
app.listen(3000, () =>
  console.log("API-Gateway running on port 3000", `http://localhost:${3000}`)
);
