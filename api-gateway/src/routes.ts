import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = express.Router();

router.use(
  "/auth",
  createProxyMiddleware({ target: "http://localhost:4001", changeOrigin: true })
);
/*router.use(
  "/products",
  createProxyMiddleware({ target: "http://localhost:5002", changeOrigin: true })
);
router.use(
  "/orders",
  createProxyMiddleware({ target: "http://localhost:5003", changeOrigin: true })
);*/

export default router;
