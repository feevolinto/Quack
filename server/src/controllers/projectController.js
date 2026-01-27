import Project from "../models/Project.js";

/**
 * CREATE project
 */
export const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      leader: req.body.leader,
      committee: req.body.committee,
      owner: req.user.id,
      members: [req.user.id]
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET all my projects
 */
export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET single project by ID
 */
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if user has access
    const isOwner = project.owner.toString() === req.user.id;
    const isMember = project.members.some(
      member => member.toString() === req.user.id
    );
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isMember && !isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE project
 */
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if user is owner or admin
    const isOwner = project.owner.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to update this project" });
    }

    // Update project fields
    Object.assign(project, req.body);
    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE project
 */
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if user is owner or admin
    const isOwner = project.owner.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to delete this project" });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};