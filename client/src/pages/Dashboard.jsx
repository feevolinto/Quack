// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateProjectModal from "../components/CreateProjectModal";
import RoleProtected from "../components/common/RoleProtected";
import { useRole } from "../hooks/useRole";
import toast from "../utils/toast";
import "../styles/Dashboard.css";
import deleteIcon from "../assets/delete.svg";
import api from "../services/api";
import logoIcon from "../assets/home_iconlogo.svg";

function Dashboard() {
  const navigate = useNavigate();
  const { isAdmin, canCreate, canDelete } = useRole();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Load projects when component mounts
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      console.log("📡 Fetching projects...");
      const data = await api.getMyProjects();
      console.log("✅ Projects loaded:", data);
      setProjects(data);
    } catch (err) {
      console.error("❌ Failed to load projects:", err);
      setError(err.message);
      toast.error("Failed to load projects");
      
      // If unauthorized, redirect to login
      if (err.message.includes("token") || err.message.includes("401")) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = () => {
    setShowCreateModal(true);
  };

  const handleAddProject = async (newProject) => {
    try {
      console.log("📡 Creating project...", newProject);
      toast.info("Creating project...");
      const created = await api.createProject(newProject);
      console.log("✅ Project created:", created);
      
      setProjects([...projects, created]);
      setShowCreateModal(false);
      toast.success("Project created successfully!");
    } catch (err) {
      console.error("❌ Failed to create project:", err);
      toast.error("Failed to create project");
    }
  };

  const handleProjectClick = (projectId) => {
    navigate(`/dashboard/project/${projectId}`);
  };

  const toggleStatus = async (projectId) => {
    try {
      const project = projects.find(p => p._id === projectId);
      const newStatus = project.status === "active" ? "inactive" : "active";
      
      console.log("📡 Updating project status...", projectId, newStatus);
      await api.updateProject(projectId, { status: newStatus });
      console.log("✅ Status updated");
      
      setProjects(projects.map(p => 
        p._id === projectId ? { ...p, status: newStatus } : p
      ));
      toast.success(`Project status updated to ${newStatus}`);
    } catch (err) {
      console.error("❌ Failed to update status:", err);
      toast.error("Failed to update project status");
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      console.log("🗑️ Deleting project:", projectId);
      await api.deleteProject(projectId);
      console.log("✅ Project deleted");
      
      setProjects(projects.filter(p => p._id !== projectId));
      toast.success("Project deleted successfully");
    } catch (err) {
      console.error("❌ Failed to delete project:", err);
      toast.error("Failed to delete project");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-logo-placeholder">
            <img src={logoIcon} alt="quack" className="brand-icon-img" />
          </div>
          <h2 className="dashboard-subtitle">Manage and track your projects</h2>
          <h1 className="dashboard-title">Project Dashboard</h1>
        </div>

        {/* Create Button - Admin Only */}
        <RoleProtected allowedRoles={['admin']}>
          <button className="create-project-btn" onClick={handleCreateProject}>
            <span className="create-icon">+</span>
            <span className="create-text">Create New Project</span>
          </button>
        </RoleProtected>

        {/* Projects Table Section */}
        <div className="projects-table-section">
          {/* Table Header */}
          <div className="table-header">
            <div className="table-header-cell project-name-col">Project Name</div>
            <div className="table-header-cell date-col">Date</div>
            <div className="table-header-cell location-col">Location</div>
            <div className="table-header-cell leader-col">Leader</div>
            <div className="table-header-cell status-col">Status</div>
            <div className="table-header-cell action-col"></div>
          </div>

          {/* Scrollable Table Body */}
          <div className="table-body">
            {projects.length === 0 ? (
              <div className="empty-state">
                <p>No projects yet. Create your first project to get started!</p>
              </div>
            ) : (
              projects.map((project, index) => (
                <div key={project._id || project.id}>
                  <div className="table-row" onClick={() => handleProjectClick(project._id || project.id)}>
                    <div className="table-cell project-name-col">{project.name}</div>
                    <div className="table-cell date-col">{formatDate(project.date)}</div>
                    <div className="table-cell location-col">{project.location}</div>
                    <div className="table-cell leader-col">{project.lead || project.leader}</div>
                    <div className="table-cell status-col">
                      <RoleProtected 
                        allowedRoles={['admin']}
                        fallback={
                          <span className={`status-badge ${project.status || 'active'} readonly`}>
                            {project.status === "active" ? "Active" : "Inactive"}
                          </span>
                        }
                      >
                        <button 
                          className={`status-badge ${project.status || 'active'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStatus(project._id || project.id);
                          }}
                        >
                          {project.status === "active" ? "Active" : "Inactive"}
                        </button>
                      </RoleProtected>
                    </div>
                    <div className="table-cell action-col">
                      <RoleProtected allowedRoles={['admin']}>
                        <button 
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(project._id || project.id);
                          }}
                        >
                          <img src={deleteIcon} alt="delete" className="nav-icon" />
                        </button>
                      </RoleProtected>
                    </div>
                  </div>
                  {index < projects.length - 1 && <div className="table-divider"></div>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateProject={handleAddProject}
      />
    </div>
  );
}

export default Dashboard;