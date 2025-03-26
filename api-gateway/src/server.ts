import express, { Request } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { Response } from "express";
import { authMiddleware } from "./middlewares/authMiddleware";
import proxy from "express-http-proxy";
import { IAuthRequest } from "@shares/models/IAuthRequest";
dotenv.config();

const app = express();
// Xử lý JSON body trước khi proxy
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*", // Thay 'http://your-frontend-domain.com' bằng domain của bạn
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(
  "/authService",
  authMiddleware,
  proxy("http://localhost:4001", {
    proxyReqPathResolver: (req) => {
      return req.originalUrl.slice("/authService".length);
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq: IAuthRequest) => {
      if (srcReq.user) {
        proxyReqOpts.headers!["x-user"] = JSON.stringify(srcReq.user);
      }
      return proxyReqOpts;
    },
    proxyReqBodyDecorator: (bodyContent, srcReq) => {
      return JSON.stringify(bodyContent);
    },
  })
);
app.use(
  "/dishService",
  authMiddleware,
  proxy("http://localhost:4002", {
    proxyReqPathResolver: (req) => {
      return req.originalUrl.slice("/dishService".length);
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq: IAuthRequest) => {
      if (srcReq.user) {
        proxyReqOpts.headers!["x-user"] = JSON.stringify(srcReq.user);
      }
      return proxyReqOpts;
    },
    proxyReqBodyDecorator: (bodyContent, srcReq) => {
      return JSON.stringify(bodyContent);
    },
  })
);
app.use(
  "/tableService",
  authMiddleware,
  proxy("http://localhost:4003", {
    proxyReqPathResolver: (req) => {
      console.log(req.originalUrl);
      return req.originalUrl.slice("/tableService".length);
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq: IAuthRequest) => {
      if (srcReq.user) {
        proxyReqOpts.headers!["x-user"] = JSON.stringify(srcReq.user);
      }
      return proxyReqOpts;
    },
    proxyReqBodyDecorator: (bodyContent, srcReq) => {
      return JSON.stringify(bodyContent);
    },
  })
);
app.use(
  "/orderService",
  authMiddleware,
  proxy("http://localhost:4004", {
    proxyReqPathResolver: (req) => {
      console.log(req.originalUrl);
      return req.originalUrl.slice("/orderService".length);
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq: IAuthRequest) => {
      if (srcReq.user) {
        proxyReqOpts.headers!["x-user"] = JSON.stringify(srcReq.user);
      }
      return proxyReqOpts;
    },
    proxyReqBodyDecorator: (bodyContent, srcReq) => {
      return JSON.stringify(bodyContent);
    },
  })
);
app.use(function notFoundHandler(_req: Request, res: Response) {
  res.status(404).send({
    message: "Not Found",
  });
});
app.listen(3000, () =>
  console.log("API-Gateway running on port 3000", `http://localhost:${3000}`)
);
