import express from "express";
import { profileController } from "../controllers/profileController";
const router = express.Router();
const controller = new profileController();
router.get("/", controller.getProfile.bind(controller));

export default router;
