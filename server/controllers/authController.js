import express from "express";
import { login, register, getMe } from "./authController.js";
import authMiddleware from "../src/middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);

export default router;
