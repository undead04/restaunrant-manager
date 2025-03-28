import { roleController } from "../controllers/roleController";
import express from "express";
const router = express.Router();
const controller = new roleController();
router.get("/", controller.getFilter.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.remove.bind(controller));
export default router;
