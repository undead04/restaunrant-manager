import express from "express";
import { OrderDetailController } from "../controllers/OrderDetailController";
const router = express.Router();
const controller = new OrderDetailController();
router.get("/", controller.getFilter.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.remove.bind(controller));
export default router;
