// src/routes/project.routes.js
import express from "express";
import { 
  createProject, 
  getMyProjects,
  getArchivedProjects,
  getProjectById,
  updateProject,
  archiveProject,
  restoreProject,
  deleteProject,
  addMemberToProject,
  removeMemberFromProject
} from "../controllers/projectController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { validate, validateObjectId } from "../middleware/validate.js";
import { createProjectSchema, updateProjectSchema } from "../validation/schemas.js";

const router = express.Router();

/**
 * CREATE project with validation
 */
router.post(
  "/", 
  authMiddleware, 
  validate(createProjectSchema), 
  createProject
);

/**
 * GET all my active projects
 */
router.get("/", authMiddleware, getMyProjects);

/**
 * GET all my archived projects
 */
router.get("/archived", authMiddleware, getArchivedProjects);

/**
 * GET single project by ID (with ObjectId validation)
 */
router.get(
  "/:id", 
  authMiddleware, 
  validateObjectId('id'), 
  getProjectById
);

/**
 * UPDATE project with validation
 */
router.patch(
  "/:id", 
  authMiddleware, 
  validateObjectId('id'),
  validate(updateProjectSchema), 
  updateProject
);

/**
 * ARCHIVE project
 */
router.patch(
  "/:id/archive", 
  authMiddleware, 
  validateObjectId('id'),
  archiveProject
);

/**
 * RESTORE archived project
 */
router.patch(
  "/:id/restore", 
  authMiddleware, 
  validateObjectId('id'),
  restoreProject
);

/**
 * ADD member to project
 */
router.post(
  "/:id/members", 
  authMiddleware, 
  validateObjectId('id'),
  addMemberToProject
);

/**
 * REMOVE member from project
 */
router.delete(
  "/:id/members", 
  authMiddleware, 
  validateObjectId('id'),
  removeMemberFromProject
);

/**
 * DELETE project permanently
 */
router.delete(
  "/:id", 
  authMiddleware, 
  validateObjectId('id'),
  deleteProject
);

export default router;