import express from "express";
import { getPublicLog } from "../controllers/public.controller.js";

const router = express.Router();

router.get("/log/:userName/:date", getPublicLog);

export default router;
