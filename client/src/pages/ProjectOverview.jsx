// src/pages/ProjectOverview.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ProjectOverview.css";

function ProjectOverview() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [project] = useState({
    name: "Event Name: Lorem ipsum",
    date: "January 10, 2026",
    lead: "Feevol Into",
    location: "123 Lorem ipsum dolor sit amet, Davao City, 8000",
    description: "Lorem ipsum dolor sit amet orem ipsum dolor sit amet orem ipsum dolor sit amet"
  });

  const [tasks, setTasks] = useState({
    todo: [
      { id: 1, name: "Task name: Lorem ipsum", priority: "High", assignedTo: "Feevol Into", committee: "Operations", days: 10 },
      { id: 2, name: "Task name: Lorem ipsum", priority: "Medium", assignedTo: "Feevol Into", committee: "Operations", days: 10 },
      { id: 3, name: "Task name: Lorem ipsum", priority: "Low", assignedTo: "Feevol Into", committee: "Operations", days: 10 }
    ],
    inProgress: [
      { id: 4, name: "Task name: Lorem ipsum", priority: "High", assignedTo: "Feevol Into", committee: "Operations", days: 10 },
      { id: 5, name: "Task name: Lorem ipsum", priority: "Medium", assignedTo: "Feevol Into", committee: "Operations", days: 10 },
      { id: 6, name: "Task name: Lorem ipsum", priority: "Low", assignedTo: "Feevol Into", committee: "Operations", days: 10 }
    ],
    finished: [
      { id: 7, name: "Task name: Lorem ipsum", priority: "High", assignedTo: "Feevol Into", committee: "Operations", days: 10 },
      { id: 8, name: "Task name: Lorem ipsum", priority: "Medium", assignedTo: "Feevol Into", committee: "Operations", days: 10 }
    ]
  });

  const handleAddTask = (column) => {
    console.log(`Add task to ${column}`);
  };

  const handleEditTask = (taskId) => {
    console.log(`Edit task ${taskId}`);
  };

  const handleEditProject = () => {
    console.log("Edit project");
  };

  const handleDeleteProject = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Project deleted");
    setShowDeleteModal(false);
    navigate("/dashboard");
  };

  return (
    <div className="project-overview-page">
      <div className="project-overview-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span className="breadcrumb-link" onClick={() => navigate("/dashboard")}>Dashboard</span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">Project Overview</span>
        </div>

        {/* Project Header */}
        <div className="project-header">
          <div className="project-info">
            <div className="project-info-left">
              <h1 className="project-event-name">{project.name}</h1>
              <p className="project-date">{project.date}</p>
              <div className="project-details">
                <div className="project-detail-item">
                  <span className="detail-label">Lead:</span>
                  <span className="detail-value">{project.lead}</span>
                </div>
              </div>
            </div>
            
            <div className="project-info-middle">
              <div className="project-detail-item">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{project.location}</span>
              </div>
            </div>

            <div className="project-info-right">
              <div className="project-detail-item">
                <span className="detail-label">Description:</span>
                <span className="detail-value description-content">{project.description}</span>
              </div>
            </div>
          </div>

          <div className="project-actions">
            <button className="action-btn edit-btn" onClick={handleEditProject}>
              ✏️
            </button>
            <button className="action-btn delete-btn-icon" onClick={handleDeleteProject}>
              🗑️
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="content-divider"></div>

        {/* Tasks Board */}
        <div className="tasks-board">
          {/* To Do Column */}
          <div className="task-column">
            <div className="task-column-header">
              <div className="column-label-wrapper">
                <div className="column-color-label todo"></div>
                <h3 className="column-title">To do</h3>
                <div className="task-count">
                  <span>{tasks.todo.length}</span>
                </div>
              </div>
              <button className="add-task-btn" onClick={() => handleAddTask('todo')}>
                +
              </button>
            </div>
            
            <div className="task-list">
              {tasks.todo.map((task) => (
                <div key={task.id} className="task-card">
                  <div className="task-card-header">
                    <span className="task-priority">{task.priority}</span>
                    <button className="task-edit-btn" onClick={() => handleEditTask(task.id)}>
                      ✏️
                    </button>
                  </div>
                  <h4 className="task-name">{task.name}</h4>
                  <div className="task-assignment">
                    <div className="task-assignment-item">
                      <span className="assignment-label">Assigned to:</span>
                      <span className="assignment-value">{task.assignedTo}</span>
                    </div>
                    <div className="task-assignment-item">
                      <span className="assignment-label">Committee:</span>
                      <span className="assignment-value">{task.committee}</span>
                    </div>
                  </div>
                  <div className="task-divider"></div>
                  <div className="task-footer">
                    <div className="days-left">
                      <span className="days-icon">⏱</span>
                      <span className="days-text">{task.days} days</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="task-column">
            <div className="task-column-header">
              <div className="column-label-wrapper">
                <div className="column-color-label in-progress"></div>
                <h3 className="column-title">In progress</h3>
                <div className="task-count">
                  <span>{tasks.inProgress.length}</span>
                </div>
              </div>
              <button className="add-task-btn" onClick={() => handleAddTask('inProgress')}>
                +
              </button>
            </div>
            
            <div className="task-list">
              {tasks.inProgress.map((task) => (
                <div key={task.id} className="task-card">
                  <div className="task-card-header">
                    <span className="task-priority">{task.priority}</span>
                    <button className="task-edit-btn" onClick={() => handleEditTask(task.id)}>
                      ✏️
                    </button>
                  </div>
                  <h4 className="task-name">{task.name}</h4>
                  <div className="task-assignment">
                    <div className="task-assignment-item">
                      <span className="assignment-label">Assigned to:</span>
                      <span className="assignment-value">{task.assignedTo}</span>
                    </div>
                    <div className="task-assignment-item">
                      <span className="assignment-label">Committee:</span>
                      <span className="assignment-value">{task.committee}</span>
                    </div>
                  </div>
                  <div className="task-divider"></div>
                  <div className="task-footer">
                    <div className="days-left">
                      <span className="days-icon">⏱</span>
                      <span className="days-text">{task.days} days</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Finished Column */}
          <div className="task-column">
            <div className="task-column-header">
              <div className="column-label-wrapper">
                <div className="column-color-label finished"></div>
                <h3 className="column-title">Finished</h3>
                <div className="task-count">
                  <span>{tasks.finished.length}</span>
                </div>
              </div>
              <button className="add-task-btn" onClick={() => handleAddTask('finished')}>
                +
              </button>
            </div>
            
            <div className="task-list">
              {tasks.finished.map((task) => (
                <div key={task.id} className="task-card">
                  <div className="task-card-header">
                    <span className="task-priority">{task.priority}</span>
                    <button className="task-edit-btn" onClick={() => handleEditTask(task.id)}>
                      ✏️
                    </button>
                  </div>
                  <h4 className="task-name">{task.name}</h4>
                  <div className="task-assignment">
                    <div className="task-assignment-item">
                      <span className="assignment-label">Assigned to:</span>
                      <span className="assignment-value">{task.assignedTo}</span>
                    </div>
                    <div className="task-assignment-item">
                      <span className="assignment-label">Committee:</span>
                      <span className="assignment-value">{task.committee}</span>
                    </div>
                  </div>
                  <div className="task-divider"></div>
                  <div className="task-footer">
                    <div className="days-left">
                      <span className="days-icon">⏱</span>
                      <span className="days-text">{task.days} days</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p className="modal-text">Are you sure you want to delete?</p>
            <div className="modal-buttons">
              <button className="modal-btn yes-btn" onClick={confirmDelete}>Yes</button>
              <button className="modal-btn no-btn" onClick={() => setShowDeleteModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectOverview;