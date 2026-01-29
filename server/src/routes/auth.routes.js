// src/routes/auth.routes.js
import express from "express";
import { login, register, getMe } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../validation/schemas.js";

const router = express.Router();

// Register with validation
router.post("/register", validate(registerSchema), register);

// Login with validation
router.post("/login", validate(loginSchema), login);

// Get current user (protected route)
router.get("/me", authMiddleware, getMe);

export default router;