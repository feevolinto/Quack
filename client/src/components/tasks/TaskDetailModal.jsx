// src/components/tasks/TaskDetailModal.jsx
import "../../styles/TaskDetailModal.css";

function TaskDetailModal({ isOpen, onClose, task }) {
  if (!isOpen || !task) return null;

  return (
    <div className="task-detail-modal-overlay" onClick={onClose}>
      <div className="task-detail-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="task-detail-header">
          <h2 className="task-detail-title">Task Details</h2>
          <button className="task-detail-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="task-detail-content">
          <div className="task-detail-section">
            <span className="task-detail-label">Task Name</span>
            <span className="task-detail-value">{task.name}</span>
          </div>

          <div className="task-detail-row">
            <div className="task-detail-section">
              <span className="task-detail-label">Priority</span>
              <span className="task-detail-value">{task.priority}</span>
            </div>

            <div className="task-detail-section">
              <span className="task-detail-label">Days Left</span>
              <span className="task-detail-value">{task.days} days</span>
            </div>
          </div>

          <div className="task-detail-row">
            <div className="task-detail-section">
              <span className="task-detail-label">Assigned To</span>
              <span className="task-detail-value">{task.assignedTo || "Not assigned"}</span>
            </div>

            <div className="task-detail-section">
              <span className="task-detail-label">Committee</span>
              <span className="task-detail-value">{task.committee || "Not assigned"}</span>
            </div>
          </div>

          {task.link && (
            <div className="task-detail-section">
              <span className="task-detail-label">Link</span>
              <a href={task.link} target="_blank" rel="noopener noreferrer" className="task-detail-link">
                {task.link}
              </a>
            </div>
          )}

          {task.description && (
            <div className="task-detail-section">
              <span className="task-detail-label">Description</span>
              <span className="task-detail-value">{task.description}</span>
            </div>
          )}
        </div>

        <div className="task-detail-actions">
          <button className="task-detail-close-action" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailModal;