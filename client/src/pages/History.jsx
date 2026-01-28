// src/pages/History.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import RoleProtected from "../components/common/RoleProtected";
import { useRole } from "../hooks/useRole";
import "../styles/History.css";
import restoreIcon from "../assets/restore.svg";

function History() {
  const navigate = useNavigate();
  const { isAdmin } = useRole();
  
  const [archivedProjects, setArchivedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArchivedProjects();
  }, []);

  const loadArchivedProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("📡 Loading archived projects...");

      const data = await api.getArchivedProjects();
      console.log("✅ Archived projects loaded:", data);

      // Format the data for display
      const formattedProjects = data.map(project => ({
        id: project._id,
        _id: project._id,
        name: project.name,
        date: formatDate(project.date),
        location: project.location || "N/A",
        leader: project.leader || project.lead || "N/A",
        status: project.status,
        archivedDate: formatDate(project.archivedAt),
        rawDate: project.date,
        rawArchivedDate: project.archivedAt
      }));

      setArchivedProjects(formattedProjects);
    } catch (err) {
      console.error("❌ Failed to load archived projects:", err);
      setError(err.message);

      if (err.message.includes("token") || err.message.includes("401")) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleRestoreProject = async (projectId) => {
    if (!isAdmin) {
      alert("Only administrators can restore projects");
      return;
    }

    if (!window.confirm("Are you sure you want to restore this project?")) {
      return;
    }

    try {
      console.log("🔄 Restoring project:", projectId);
      
      const restored = await api.restoreProject(projectId);
      console.log("✅ Project restored:", restored);

      setArchivedProjects(archivedProjects.filter(project => project._id !== projectId));

      alert("Project restored successfully!");
    } catch (err) {
      console.error("❌ Failed to restore project:", err);
      alert(`Failed to restore project: ${err.message}`);
    }
  };

  const handleProjectClick = (projectId) => {
    console.log("📍 Viewing archived project:", projectId);
    navigate(`/dashboard/project/${projectId}`);
  };

  if (loading) {
    return (
      <div className="history-page">
        <div className="history-container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: 'white',
            fontSize: '18px'
          }}>
            Loading archived projects...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-page">
        <div className="history-container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: 'white',
            fontSize: '16px',
            gap: '20px'
          }}>
            <p style={{ color: '#e74c3c' }}>Error: {error}</p>
            <button
              onClick={loadArchivedProjects}
              style={{
                padding: '10px 20px',
                background: '#834dfb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">
      <div className="history-container">
        {/* Header */}
        <div className="history-header">
          <div className="history-logo-placeholder">
            <img src="/src/assets/home_iconlogo.svg" alt="Quack" className="brand-icon-img" />
          </div>
          <h2 className="history-subtitle">View and restore past projects</h2>
          <h1 className="history-title">Project History</h1>
        </div>

        {/* Projects Table Section */}
        <div className="history-table-section">
          {/* Table Header */}
          <div className="history-table-header">
            <div className="history-header-cell project-name-col">Project Name</div>
            <div className="history-header-cell date-col">Date</div>
            <div className="history-header-cell location-col">Location</div>
            <div className="history-header-cell leader-col">Leader</div>
            <div className="history-header-cell status-col">Status</div>
            <div className="history-header-cell archived-col">Archived</div>
            <div className="history-header-cell restore-col">Restore</div>
          </div>

          {/* Scrollable Table Body */}
          <div className="history-table-body">
            {archivedProjects.length > 0 ? (
              archivedProjects.map((project, index) => (
                <div key={project._id}>
                  <div className="history-table-row" onClick={() => handleProjectClick(project._id)}>
                    <div className="history-cell project-name-col">{project.name}</div>
                    <div className="history-cell date-col">{project.date}</div>
                    <div className="history-cell location-col">{project.location}</div>
                    <div className="history-cell leader-col">{project.leader}</div>
                    <div className="history-cell status-col">
                      <span className={`history-status-badge ${project.status}`}>
                        {project.status === "finished" ? "Finished" : 
                         project.status === "trashed" ? "Trashed" : "Archived"}
                      </span>
                    </div>
                    <div className="history-cell archived-col">{project.archivedDate}</div>
                    <div className="history-cell restore-col">
                      {/* Admin-only restore button */}
                      <RoleProtected allowedRoles={['admin']}>
                        <button 
                          className="restore-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRestoreProject(project._id);
                          }}
                        >
                          <img src={restoreIcon} alt="restore" className="restore-icon" />
                        </button>
                      </RoleProtected>
                    </div>
                  </div>
                  {index < archivedProjects.length - 1 && <div className="history-table-divider"></div>}
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p className="empty-text">No archived projects found</p>
                <p className="empty-subtext">Finished or deleted projects will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;