// src/pages/ProjectOverview.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddTaskModal from "../components/tasks/AddTaskModal";
import EditTaskModal from "../components/tasks/EditTaskModal";
import TaskDetailModal from "../components/tasks/TaskDetailModal";
import "../styles/ProjectOverview.css";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import addIcon from "../assets/add.svg";
import rightIcon from "../assets/right.svg";

function ProjectOverview() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState(null);
  
  const [project] = useState({
    name: "Event Name: Lorem ipsum",
    date: "January 10, 2026",
    lead: "Feevol Into",
    location: "123 Lorem ipsum dolor sit amet, Davao City, 8000",
    description: "Lorem ipsum dolor sit amet orem ipsum dolor sit amet orem ipsum dolor sit amet"
  });

  const [tasks, setTasks] = useState({
    todo: [
      { id: 1, name: "Task name: Lorem ipsum", priority: "High", assignedTo: "Feevol Into", committee: "Operations", days: 10, date: "2026-02-02", link: "", description: "Task description here" },
      { id: 2, name: "Task name: Lorem ipsum", priority: "Medium", assignedTo: "Feevol Into", committee: "Operations", days: 10, date: "2026-02-02", link: "", description: "" },
      { id: 3, name: "Task name: Lorem ipsum", priority: "Low", assignedTo: "Feevol Into", committee: "Operations", days: 10, date: "2026-02-02", link: "", description: "" }
    ],
    inProgress: [
      { id: 4, name: "Task name: Lorem ipsum", priority: "High", assignedTo: "Feevol Into", committee: "Operations", days: 10, date: "2026-02-02", link: "", description: "" },
      { id: 5, name: "Task name: Lorem ipsum", priority: "Medium", assignedTo: "Feevol Into", committee: "Operations", days: 10, date: "2026-02-02", link: "", description: "" },
      { id: 6, name: "Task name: Lorem ipsum", priority: "Low", assignedTo: "Feevol Into", committee: "Operations", days: 10, date: "2026-02-02", link: "", description: "" }
    ],
    finished: [
      { id: 7, name: "Task name: Lorem ipsum", priority: "High", assignedTo: "Feevol Into", committee: "Operations", days: 10, date: "2026-02-02", link: "", description: "" },
      { id: 8, name: "Task name: Lorem ipsum", priority: "Medium", assignedTo: "Feevol Into", committee: "Operations", days: 10, date: "2026-02-02", link: "", description: "" }
    ]
  });

  const handleAddTask = (column) => {
    setSelectedColumn(column);
    setShowAddTaskModal(true);
  };

  const handleCreateTask = (column, newTask) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [column]: [...prevTasks[column], newTask]
    }));
  };

  const handleEditTask = (e, task, column) => {
    e.stopPropagation();
    setSelectedTask(task);
    setSelectedColumn(column);
    setShowEditTaskModal(true);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [selectedColumn]: prevTasks[selectedColumn].map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    }));
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowTaskDetailModal(true);
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

  // Drag and Drop handlers
  const handleDragStart = (e, task, column) => {
    setDraggedTask(task);
    setDraggedFromColumn(column);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    
    if (!draggedTask || draggedFromColumn === targetColumn) {
      return;
    }

    // Remove task from original column
    const updatedFromColumn = tasks[draggedFromColumn].filter(
      task => task.id !== draggedTask.id
    );

    // Add task to target column
    const updatedToColumn = [...tasks[targetColumn], draggedTask];

    setTasks({
      ...tasks,
      [draggedFromColumn]: updatedFromColumn,
      [targetColumn]: updatedToColumn
    });

    setDraggedTask(null);
    setDraggedFromColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDraggedFromColumn(null);
  };

  const renderTaskColumn = (columnKey, columnTitle, colorClass) => {
    return (
      <div 
        className="task-column"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, columnKey)}
      >
        <div className="task-column-header">
          <div className="column-label-wrapper">
            <div className={`column-color-label ${colorClass}`}></div>
            <h3 className="column-title">{columnTitle}</h3>
            <div className="task-count">
              <span>{tasks[columnKey].length}</span>
            </div>
          </div>
          <button className="add-task-btn" onClick={() => handleAddTask(columnKey)}>
            <img src={addIcon} alt="add" className="nav-icon" />
          </button>
        </div>
        
        <div className="task-list">
          {tasks[columnKey].map((task) => (
            <div 
              key={task.id} 
              className="task-card"
              draggable
              onDragStart={(e) => handleDragStart(e, task, columnKey)}
              onDragEnd={handleDragEnd}
              onClick={() => handleTaskClick(task)}
            >
              <div className="task-card-header">
                <span className="task-priority">{task.priority}</span>
                <button 
                  className="task-edit-btn" 
                  onClick={(e) => handleEditTask(e, task, columnKey)}
                >
                  <img src={editIcon} alt="edit" className="nav-icon" />
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
    );
  };

  return (
    <div className="project-overview-page">
      <div className="project-overview-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span className="breadcrumb-link" onClick={() => navigate("/dashboard")}>Project Dashboard</span>
          <span className="breadcrumb-separator"><img src={rightIcon} alt="next" className="nav-icon" /></span>
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
              <img src={editIcon} alt="edit" className="nav-icon" />
            </button>
            <button className="action-btn delete-btn-icon" onClick={handleDeleteProject}>
              <img src={deleteIcon} alt="delete" className="nav-icon" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="content-divider"></div>

        {/* Tasks Board */}
        <div className="tasks-board">
          {renderTaskColumn('todo', 'To do', 'todo')}
          {renderTaskColumn('inProgress', 'In progress', 'in-progress')}
          {renderTaskColumn('finished', 'Finished', 'finished')}
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

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        columnType={selectedColumn}
        onAddTask={handleCreateTask}
      />

      {/* Edit Task Modal */}
      <EditTaskModal
        isOpen={showEditTaskModal}
        onClose={() => setShowEditTaskModal(false)}
        task={selectedTask}
        onUpdateTask={handleUpdateTask}
      />

      {/* Task Detail Modal */}
      <TaskDetailModal
        isOpen={showTaskDetailModal}
        onClose={() => setShowTaskDetailModal(false)}
        task={selectedTask}
      />
    </div>
  );
}

export default ProjectOverview;