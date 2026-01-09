import Project from "../models/Project.js";

const projectAccess = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const isOwner = project.owner.toString() === req.user.id;
    const isMember = project.members.includes(req.user.id);
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isMember && !isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    req.project = project;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default projectAccess;