import { permissionController } from "../controllers/permissionController";
import express from "express";
const router = express.Router();
const controller = new permissionController();
router.get("/", controller.getAll.bind(controller));

export default router;
