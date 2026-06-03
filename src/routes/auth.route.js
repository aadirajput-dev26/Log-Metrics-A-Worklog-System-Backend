import express from "express";
import { signup, login, logout, checkUsername, setUsername, googleAuth } from "../controllers/auth.controller.js"
const router = express.Router();

router.post("/signup" , signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check-username", checkUsername);
router.post("/set-username", setUsername);
router.post("/google", googleAuth);

export default router;