import Project from "../models/Project.js";

/**
 * CREATE project (admin only)
 */
export const createProject = async (req, res) => {
  try {
    // Only admins can create projects
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only administrators can create projects" });
    }

    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      leader: req.body.leader,
      committee: req.body.committee,
      owner: req.user.id,
      members: [req.user.id] // Creator is the owner
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET all my ACTIVE projects (excludes archived)
 * Everyone sees ALL active projects, but with role-based permissions
 */
export const getMyProjects = async (req, res) => {
  try {
    const query = {
      status: { $nin: ["archived", "trashed", "finished"] } // Exclude archived
    };

    // Both admins and members see ALL active projects
    const projects = await Project.find(query);

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET all my ARCHIVED projects
 * Everyone sees ALL archived projects, but with role-based permissions
 */
export const getArchivedProjects = async (req, res) => {
  try {
    const query = {
      status: { $in: ["archived", "trashed", "finished"] }
    };

    // Both admins and members see ALL archived projects
    const projects = await Project.find(query).sort({ archivedAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET single project by ID
 * Everyone can view any project (admin and member)
 */
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // All authenticated users can view projects
    // Permissions are handled at the action level (edit, delete, etc.)
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE project (admin only)
 */
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only admins can update projects
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only administrators can update projects" });
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
 * ARCHIVE project (admin only)
 */
export const archiveProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only admins can archive projects
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only administrators can archive projects" });
    }

    // Mark as archived (can be "archived", "finished", or "trashed")
    const archiveStatus = req.body.status || "archived";
    project.status = archiveStatus;
    project.archivedAt = new Date();
    await project.save();

    res.json({ 
      message: `Project ${archiveStatus}`, 
      project 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * RESTORE archived project (admin only)
 */
export const restoreProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only admins can restore projects
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only administrators can restore projects" });
    }

    // Restore to active status
    project.status = "active";
    project.archivedAt = undefined; // Remove archived date
    await project.save();

    res.json({ 
      message: "Project restored", 
      project 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE project permanently (admin only)
 */
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only admins can delete projects
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only administrators can delete projects" });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: "Project deleted permanently" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ADD member to project (admin only)
 */
export const addMemberToProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only admins can add members
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only administrators can add members" });
    }

    const { userId } = req.body;

    // Check if user is already a member
    if (project.members.includes(userId)) {
      return res.status(400).json({ message: "User is already a member" });
    }

    project.members.push(userId);
    await project.save();

    res.json({ message: "Member added successfully", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * REMOVE member from project (admin only)
 */
export const removeMemberFromProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only admins can remove members
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only administrators can remove members" });
    }

    const { userId } = req.body;

    // Don't allow removing the owner
    if (project.owner.toString() === userId) {
      return res.status(400).json({ message: "Cannot remove project owner" });
    }

    project.members = project.members.filter(
      member => member.toString() !== userId
    );
    await project.save();

    res.json({ message: "Member removed successfully", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};