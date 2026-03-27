import express from "express";
import { createActivityRecord , getActivityRecords , updateActivityRecord } from "../controllers/activityRecord.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, createActivityRecord);
router.get("/", protectRoute, getActivityRecords);
router.patch("/:id", protectRoute, updateActivityRecord);

export default router;