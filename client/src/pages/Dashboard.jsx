// src/pages/Dashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Event Name: Lorem ipsum",
      date: "01/31/2026",
      location: "123 Lorem ipsum dolor,...",
      leader: "Feevol Into",
      status: "active"
    },
    {
      id: 2,
      name: "Event Name: Lorem ipsum",
      date: "01/31/2026",
      location: "123 Lorem ipsum dolor,...",
      leader: "Feevol Into",
      status: "active"
    },
    {
      id: 3,
      name: "Event Name: Lorem ipsum",
      date: "01/31/2026",
      location: "123 Lorem ipsum dolor,...",
      leader: "Feevol Into",
      status: "active"
    },
    {
      id: 4,
      name: "Event Name: Lorem ipsum",
      date: "01/31/2026",
      location: "123 Lorem ipsum dolor,...",
      leader: "Feevol Into",
      status: "inactive"
    },
    {
      id: 5,
      name: "Event Name: Lorem ipsum",
      date: "01/31/2026",
      location: "123 Lorem ipsum dolor,...",
      leader: "Feevol Into",
      status: "active"
    },
    {
      id: 6,
      name: "Event Name: Lorem ipsum",
      date: "01/31/2026",
      location: "123 Lorem ipsum dolor,...",
      leader: "Feevol Into",
      status: "active"
    },
    {
      id: 7,
      name: "Event Name: Lorem ipsum",
      date: "01/31/2026",
      location: "123 Lorem ipsum dolor,...",
      leader: "Feevol Into",
      status: "active"
    },
    {
      id: 8,
      name: "Event Name: Lorem ipsum",
      date: "01/31/2026",
      location: "123 Lorem ipsum dolor,...",
      leader: "Feevol Into",
      status: "inactive"
    },
    {
      id: 9,
      name: "Event Name: Lorem ipsum",
      date: "01/31/2026",
      location: "123 Lorem ipsum dolor,...",
      leader: "Feevol Into",
      status: "active"
    }
  ]);

  const handleCreateProject = () => {
    console.log("Create new project");
    // Add your create project logic here
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const toggleStatus = (id) => {
    setProjects(projects.map(project => 
      project.id === id 
        ? { ...project, status: project.status === "active" ? "inactive" : "active" }
        : project
    ));
  };

  const handleProjectClick = (projectId) => {
    navigate(`/dashboard/project/${projectId}`);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-logo-placeholder">
            <img src="/src/assets/home_iconlogo.svg" alt="Quack" className="brand-icon-img" />
          </div>
          <h1 className="dashboard-title">Dashboard</h1>
        </div>

        {/* Create Button */}
        <button className="create-project-btn" onClick={handleCreateProject}>
          <span className="create-icon">+</span>
          <span className="create-text">Create New Project</span>
        </button>

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
            {projects.map((project, index) => (
              <div key={project.id}>
                <div className="table-row" onClick={() => handleProjectClick(project.id)}>
                  <div className="table-cell project-name-col">{project.name}</div>
                  <div className="table-cell date-col">{project.date}</div>
                  <div className="table-cell location-col">{project.location}</div>
                  <div className="table-cell leader-col">{project.leader}</div>
                  <div className="table-cell status-col">
                    <button 
                      className={`status-badge ${project.status}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStatus(project.id);
                      }}
                    >
                      {project.status === "active" ? "Active" : "Inactive"}
                    </button>
                  </div>
                  <div className="table-cell action-col">
                    <button 
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProject(project.id);
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                {index < projects.length - 1 && <div className="table-divider"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;