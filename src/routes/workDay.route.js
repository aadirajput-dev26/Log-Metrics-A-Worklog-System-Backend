import express from "express";
import { createWorkDay , getWorkDay , updateWorkDay, getTodayWorkDay, endWorkDay } from "../controllers/workDay.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, createWorkDay);
router.get("/", protectRoute, getWorkDay);
router.patch("/", protectRoute, updateWorkDay);
router.get("/today", protectRoute, getTodayWorkDay);
router.post("/end", protectRoute, endWorkDay);

export default router;