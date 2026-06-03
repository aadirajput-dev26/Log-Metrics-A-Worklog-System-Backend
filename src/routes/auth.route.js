import express from "express";
import { signup, login, logout, checkUsername, setUsername, googleAuth } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"
const router = express.Router();

router.post("/signup" , signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check-username", checkUsername);
router.post("/set-username", protectRoute, setUsername);
router.post("/google", googleAuth);

export default router;