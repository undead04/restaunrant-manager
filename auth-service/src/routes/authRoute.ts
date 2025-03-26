import express from "express";
import { authController } from "../controllers/authController";
const router = express.Router();
const controller = new authController();
router.post("/login", controller.login.bind(controller));

export default router;
