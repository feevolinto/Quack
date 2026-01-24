// src/pages/History.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/History.css";
import restoreIcon from "../assets/restore.svg";

function History() {
  const navigate = useNavigate();
  
  const [archivedProjects, setArchivedProjects] = useState([
    {
      id: 1,
      name: "Event Name: Lorem ipsum",
      date: "01/15/2026",
      location: "123 Lorem ipsum dolor,...",
      leader: "Feevol Into",
      status: "finished",
      archivedDate: "01/20/2026"
    },
    {
      id: 2,
      name: "Event Name: Lorem ipsum",
      date: "12/20/2025",
      location: "123 Lorem ipsum dolor,...",
      leader: "Feevol Into",
      status: "trashed",
      archivedDate: "01/18/2026"
    },
    {
      id: 3,
      name: "Event Name: Lorem ipsum",
      date: "01/10/2026",
      location: "123 Lorem ipsum dolor,...",
      leader: "Feevol Into",
      status: "finished",
      archivedDate: "01/19/2026"
    },
    {
      id: 4,
      name: "Event Name: Lorem ipsum",
      date: "12/28/2025",
      location: "123 Lorem ipsum dolor,...",
      leader: "Feevol Into",
      status: "trashed",
      archivedDate: "01/17/2026"
    },
    {
      id: 5,
      name: "Event Name: Lorem ipsum",
      date: "01/05/2026",
      location: "123 Lorem ipsum dolor,...",
      leader: "Feevol Into",
      status: "finished",
      archivedDate: "01/16/2026"
    },
    {
      id: 6,
      name: "Event Name: Lorem ipsum",
      date: "12/15/2025",
      location: "123 Lorem ipsum dolor,...",
      leader: "Feevol Into",
      status: "trashed",
      archivedDate: "01/15/2026"
    },
    {
      id: 7,
      name: "Event Name: Lorem ipsum",
      date: "01/08/2026",
      location: "123 Lorem ipsum dolor,...",
      leader: "Feevol Into",
      status: "finished",
      archivedDate: "01/14/2026"
    },
    {
      id: 8,
      name: "Event Name: Lorem ipsum",
      date: "12/30/2025",
      location: "123 Lorem ipsum dolor,...",
      leader: "Feevol Into",
      status: "trashed",
      archivedDate: "01/13/2026"
    },
    {
      id: 9,
      name: "Event Name: Lorem ipsum",
      date: "01/12/2026",
      location: "123 Lorem ipsum dolor,...",
      leader: "Feevol Into",
      status: "finished",
      archivedDate: "01/12/2026"
    }
  ]);

  const handleRestoreProject = (id) => {
    // Remove from archived projects (restore to active projects)
    console.log(`Restoring project ${id}`);
    setArchivedProjects(archivedProjects.filter(project => project.id !== id));
    // In real implementation, you would add it back to active projects
  };

  const handleProjectClick = (projectId) => {
    navigate(`/dashboard/project/${projectId}`);
  };

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
                <div key={project.id}>
                  <div className="history-table-row" onClick={() => handleProjectClick(project.id)}>
                    <div className="history-cell project-name-col">{project.name}</div>
                    <div className="history-cell date-col">{project.date}</div>
                    <div className="history-cell location-col">{project.location}</div>
                    <div className="history-cell leader-col">{project.leader}</div>
                    <div className="history-cell status-col">
                      <span className={`history-status-badge ${project.status}`}>
                        {project.status === "finished" ? "Finished" : "Trashed"}
                      </span>
                    </div>
                    <div className="history-cell archived-col">{project.archivedDate}</div>
                    <div className="history-cell restore-col">
                      <button 
                        className="restore-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRestoreProject(project.id);
                        }}
                      >
                        <img src={restoreIcon} alt="restore" className="restore-icon" />
                      </button>
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