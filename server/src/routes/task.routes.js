import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createTask,
  getTasksByBoard,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";

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
 * GET tasks by board
 */
router.get(
  "/board/:boardId",
  authMiddleware,
  getTasksByBoard
);

/**
 * UPDATE task (details)
 */
router.patch(
  "/:id",
  authMiddleware,
  updateTask
);

/**
 * UPDATE task STATUS (drag & drop)
 */
router.patch(
  "/:id/status",
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
