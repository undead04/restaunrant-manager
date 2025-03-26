import { OrderController } from "../controllers/OrderController";
import express from "express";
const router = express.Router();
const controller = new OrderController();
router.get("/", controller.getFilter.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", controller.create.bind(controller));

router.delete("/:id", controller.remove.bind(controller));
export default router;
