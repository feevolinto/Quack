// src/pages/ProjectOverview.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import AddTaskModal from "../components/tasks/AddTaskModal";
import EditTaskModal from "../components/tasks/EditTaskModal";
import TaskDetailModal from "../components/tasks/TaskDetailModal";
import EditProjectModal from "../components/tasks/EditProjectModal";
import RoleProtected from "../components/common/RoleProtected";
import { useRole } from "../hooks/useRole";
import "../styles/ProjectOverview.css";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import addIcon from "../assets/add.svg";
import rightIcon from "../assets/right.svg";

function ProjectOverview() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isAdmin, canEdit, canDelete } = useRole();
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState(null);
  
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    finished: []
  });
  const [loading, setLoading] = useState(true);

  // Load project and tasks when component mounts
  useEffect(() => {
    if (projectId) {
      loadProjectAndTasks();
    }
  }, [projectId]);

  const loadProjectAndTasks = async () => {
    try {
      console.log("📡 Loading project:", projectId);
      
      // Load project details
      const projectData = await api.getProjectById(projectId);
      console.log("✅ Project loaded:", projectData);
      setProject(projectData);

      // Load tasks for this project
      const tasksData = await api.getTasksByProject(projectId);
      console.log("✅ Tasks loaded:", tasksData);
      
      // Organize tasks by status
      const organized = {
        todo: tasksData.filter(t => t.status === "todo"),
        inProgress: tasksData.filter(t => t.status === "in-progress"),
        finished: tasksData.filter(t => t.status === "finished")
      };
      
      setTasks(organized);
    } catch (err) {
      console.error("❌ Failed to load data:", err);
      alert("Failed to load project data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = (column) => {
    setSelectedColumn(column);
    setShowAddTaskModal(true);
  };

  const handleCreateTask = async (column, taskData) => {
    try {
      console.log("📡 Creating task:", taskData);
      
      // Map column to status
      const statusMap = {
        todo: "todo",
        inProgress: "in-progress",
        finished: "finished"
      };
      
      // Prepare the data for API
      const apiTaskData = {
        name: taskData.name,
        description: taskData.description || "",
        status: statusMap[column] || "todo",
        priority: taskData.priority || "Medium",
        committee: taskData.committee || "",
        link: taskData.link || "",
        dueDate: taskData.dueDate,
        project: projectId
      };
      
      console.log("📤 Sending to API:", apiTaskData);
      
      const created = await api.createTask(apiTaskData);
      console.log("✅ Task created:", created);
      
      // Calculate days left for display
      let days = 0;
      if (created.dueDate) {
        const dueDate = new Date(created.dueDate);
        const today = new Date();
        const diffTime = dueDate - today;
        days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        days = days > 0 ? days : 0;
      }
      
      // Add to local state with display-friendly format
      const displayTask = {
        ...created,
        days: days,
        assignedTo: taskData.assignedTo || "Unassigned"
      };
      
      setTasks(prevTasks => ({
        ...prevTasks,
        [column]: [...prevTasks[column], displayTask]
      }));
    } catch (err) {
      console.error("❌ Failed to create task:", err);
      alert(`Failed to create task: ${err.message}`);
    }
  };

  const handleEditTask = (e, task, column) => {
    e.stopPropagation();
    setSelectedTask(task);
    setSelectedColumn(column);
    setShowEditTaskModal(true);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      console.log("📡 Updating task:", updatedTask);
      await api.updateTask(updatedTask._id, updatedTask);
      console.log("✅ Task updated");
      
      // Reload data to get fresh state
      loadProjectAndTasks();
    } catch (err) {
      console.error("❌ Failed to update task:", err);
      alert(err.message);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowTaskDetailModal(true);
  };

  const handleEditProject = () => {
    if (!canEdit) {
      alert("Only administrators can edit projects");
      return;
    }
    setShowEditProjectModal(true);
  };

  const handleUpdateProject = async (updatedProject) => {
    try {
      console.log("📡 Updating project:", updatedProject);
      await api.updateProject(projectId, updatedProject);
      console.log("✅ Project updated");
      
      setProject(updatedProject);
    } catch (err) {
      console.error("❌ Failed to update project:", err);
      alert(err.message);
    }
  };

  const handleDeleteProject = () => {
    if (!canDelete) {
      alert("Only administrators can delete projects");
      return;
    }
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      console.log("🗑️ Deleting project:", projectId);
      await api.deleteProject(projectId);
      console.log("✅ Project deleted");
      setShowDeleteModal(false);
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Failed to delete project:", err);
      alert(err.message);
    }
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

  const handleDrop = async (e, targetColumn) => {
    e.preventDefault();
    
    if (!draggedTask || draggedFromColumn === targetColumn) return;

    try {
      console.log("📡 Moving task to:", targetColumn);
      
      const statusMap = {
        todo: "todo",
        inProgress: "in-progress",
        finished: "finished"
      };

      await api.updateTask(draggedTask._id, {
        status: statusMap[targetColumn]
      });
      
      console.log("✅ Task moved successfully");

      // Update local state
      const updatedFromColumn = tasks[draggedFromColumn].filter(
        task => task._id !== draggedTask._id
      );

      const updatedToColumn = [...tasks[targetColumn], {
        ...draggedTask,
        status: statusMap[targetColumn]
      }];

      setTasks({
        ...tasks,
        [draggedFromColumn]: updatedFromColumn,
        [targetColumn]: updatedToColumn
      });
    } catch (err) {
      console.error("❌ Failed to move task:", err);
      alert("Failed to move task");
      loadProjectAndTasks(); // Reload on error
    }

    setDraggedTask(null);
    setDraggedFromColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDraggedFromColumn(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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
          {/* All users can add tasks */}
          <button className="add-task-btn" onClick={() => handleAddTask(columnKey)}>
            <img src={addIcon} alt="add" className="nav-icon" />
          </button>
        </div>
        
        <div className="task-list">
          {tasks[columnKey].map((task) => (
            <div 
              key={task._id || task.id} 
              className="task-card"
              draggable
              onDragStart={(e) => handleDragStart(e, task, columnKey)}
              onDragEnd={handleDragEnd}
              onClick={() => handleTaskClick(task)}
            >
              <div className="task-card-header">
                <span className="task-priority">{task.priority}</span>
                {/* All users can edit tasks */}
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

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!project) {
    return <div className="error">Project not found</div>;
  }

  return (
    <div className="project-overview-page">
      <div className="project-overview-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span className="breadcrumb-link" onClick={() => navigate("/dashboard")}>Project Dashboard</span>
          <span className="breadcrumb-separator">
            <img src={rightIcon} alt="next" className="nav-icon" />
          </span>
          <span className="breadcrumb-current">Project Overview</span>
        </div>

        {/* Project Header */}
        <div className="project-header">
          <div className="project-info">
            <div className="project-info-left">
              <h1 className="project-event-name">{project.name}</h1>
              <p className="project-date">{formatDate(project.date)}</p>
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

          {/* Admin-only project actions */}
          <div className="project-actions">
            <RoleProtected allowedRoles={['admin']}>
              <button className="action-btn edit-btn" onClick={handleEditProject}>
                <img src={editIcon} alt="edit" className="nav-icon" />
              </button>
              <button className="action-btn delete-btn-icon" onClick={handleDeleteProject}>
                <img src={deleteIcon} alt="delete" className="nav-icon" />
              </button>
            </RoleProtected>
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

      {/* Delete Confirmation Modal - Admin Only */}
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

      {/* Add Task Modal - All Users */}
      <AddTaskModal
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        columnType={selectedColumn}
        onAddTask={handleCreateTask}
      />

      {/* Edit Task Modal - All Users */}
      <EditTaskModal
        isOpen={showEditTaskModal}
        onClose={() => setShowEditTaskModal(false)}
        task={selectedTask}
        onUpdateTask={handleUpdateTask}
      />

      {/* Task Detail Modal - All Users */}
      <TaskDetailModal
        isOpen={showTaskDetailModal}
        onClose={() => setShowTaskDetailModal(false)}
        task={selectedTask}
      />

      {/* Edit Project Modal - Admin Only */}
      {isAdmin && (
        <EditProjectModal
          isOpen={showEditProjectModal}
          onClose={() => setShowEditProjectModal(false)}
          project={project}
          onUpdateProject={handleUpdateProject}
        />
      )}
    </div>
  );
}

export default ProjectOverview;