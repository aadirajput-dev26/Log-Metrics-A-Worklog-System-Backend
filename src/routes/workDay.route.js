import express from "express";
import { createWorkDay , getWorkDay , updateWorkDay } from "../controllers/workDay.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, createWorkDay);
router.get("/", protectRoute, getWorkDay);
router.patch("/", protectRoute, updateWorkDay);

export default router;