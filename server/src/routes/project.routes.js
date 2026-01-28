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
  addMemberToProject,       // NEW
  removeMemberFromProject   // NEW
} from "../controllers/projectController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * CREATE project (admin only - enforced in controller)
 */
router.post("/", authMiddleware, createProject);

/**
 * GET all my active projects
 * - Admins: see ALL active projects
 * - Members: see only projects they're members of
 */
router.get("/", authMiddleware, getMyProjects);

/**
 * GET all my archived projects
 * - Admins: see ALL archived projects  
 * - Members: see only archived projects they're members of
 */
router.get("/archived", authMiddleware, getArchivedProjects);

/**
 * GET single project by ID
 */
router.get("/:id", authMiddleware, getProjectById);

/**
 * UPDATE project (admin only - enforced in controller)
 */
router.patch("/:id", authMiddleware, updateProject);

/**
 * ARCHIVE project (admin only - enforced in controller)
 */
router.patch("/:id/archive", authMiddleware, archiveProject);

/**
 * RESTORE archived project (admin only - enforced in controller)
 */
router.patch("/:id/restore", authMiddleware, restoreProject);

/**
 * ADD member to project (admin only - enforced in controller)
 */
router.post("/:id/members", authMiddleware, addMemberToProject);

/**
 * REMOVE member from project (admin only - enforced in controller)
 */
router.delete("/:id/members", authMiddleware, removeMemberFromProject);

/**
 * DELETE project permanently (admin only - enforced in controller)
 */
router.delete("/:id", authMiddleware, deleteProject);

export default router;