import express from "express";
import { kitchenController } from "src/controllers/kitchenController";
const kitchenRouter = express.Router();
const controller = new kitchenController();
kitchenRouter.get("/", controller.getOrderQueue.bind(controller));
export default kitchenRouter;
