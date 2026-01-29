// src/routes/task.routes.js
import express from "express";
import {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { validate, validateObjectId } from "../middleware/validate.js";
import { createTaskSchema, updateTaskSchema } from "../validation/schemas.js";

const router = express.Router();

/**
 * CREATE task with validation
 */
router.post(
  "/",
  authMiddleware,
  validate(createTaskSchema),
  createTask
);

/**
 * GET tasks by project
 */
router.get(
  "/project/:projectId",
  authMiddleware,
  validateObjectId('projectId'),
  getTasksByProject
);

/**
 * GET single task by ID
 */
router.get(
  "/:id",
  authMiddleware,
  validateObjectId('id'),
  getTaskById
);

/**
 * UPDATE task with validation
 */
router.patch(
  "/:id",
  authMiddleware,
  validateObjectId('id'),
  validate(updateTaskSchema),
  updateTask
);

/**
 * DELETE task
 */
router.delete(
  "/:id",
  authMiddleware,
  validateObjectId('id'),
  deleteTask
);

export default router;