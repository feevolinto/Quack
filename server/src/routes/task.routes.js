import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";  // ✅ Correct path

const router = express.Router();

/**
 * CREATE task
 */
router.post(
  "/",
  authMiddleware,
  createTask
);

/**
 * GET tasks by PROJECT (FIXED: was /board/:boardId)
 */
router.get(
  "/project/:projectId",
  authMiddleware,
  getTasksByProject
);

/**
 * GET single task by ID
 */
router.get(
  "/:id",
  authMiddleware,
  getTaskById
);

/**
 * UPDATE task (details or status)
 */
router.patch(
  "/:id",
  authMiddleware,
  updateTask
);

/**
 * DELETE task
 */
router.delete(
  "/:id",
  authMiddleware,
  deleteTask
);

export default router;