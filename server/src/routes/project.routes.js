import express from "express";
import { 
  createProject, 
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";  // ✅ Correct path
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * CREATE project
 */
router.post("/", authMiddleware, createProject);

/**
 * GET all my projects
 */
router.get("/", authMiddleware, getMyProjects);

/**
 * GET single project by ID
 */
router.get("/:id", authMiddleware, getProjectById);

/**
 * UPDATE project
 */
router.patch("/:id", authMiddleware, updateProject);

/**
 * DELETE project
 */
router.delete("/:id", authMiddleware, deleteProject);

export default router;