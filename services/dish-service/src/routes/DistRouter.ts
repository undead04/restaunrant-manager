import express from "express";
import { DistController } from "./../controllers/DistController";
const router = express.Router();
const controller = new DistController();
router.get("/", controller.getFilter.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.remove.bind(controller));
export default router;
