// src/components/tasks/AddTaskModal.jsx
import { useState } from "react";
import "../../styles/AddTaskModal.css";

function AddTaskModal({ isOpen, onClose, columnType, onAddTask }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    taskName: "",
    date: "",
    assignedTo: "",
    committee: "",
    link: "",
    description: "",
    priority: "Medium"
  });

  if (!isOpen) return null;

  const getColumnTitle = () => {
    switch (columnType) {
      case 'todo':
        return 'To do';
      case 'inProgress':
        return 'In progress';
      case 'finished':
        return 'Finished';
      default:
        return 'To do';
    }
  };

  const getColumnClass = () => {
    switch (columnType) {
      case 'todo':
        return 'todo';
      case 'inProgress':
        return 'in-progress';
      case 'finished':
        return 'finished';
      default:
        return 'todo';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmCreate = () => {
    // Prepare task data for API
    const taskData = {
      name: formData.taskName,  // ✅ Map taskName to name
      description: formData.description,
      priority: formData.priority,
      committee: formData.committee,
      link: formData.link,
      dueDate: formData.date || undefined,
      // ✅ DON'T send assignedTo if it's empty or just a name
      // The backend expects an ObjectId, so we'll leave it empty for now
      // You can implement user selection later
    };

    // Calculate days left if date is provided
    if (formData.date) {
      const dueDate = new Date(formData.date);
      const today = new Date();
      const diffTime = dueDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      taskData.days = diffDays > 0 ? diffDays : 0;
    }

    onAddTask(columnType, taskData);
    handleClose();
  };

  const calculateDaysLeft = (dateString) => {
    const targetDate = new Date(dateString);
    const today = new Date();
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleClose = () => {
    setFormData({
      taskName: "",
      date: "",
      assignedTo: "",
      committee: "",
      link: "",
      description: "",
      priority: "Medium"
    });
    setShowConfirmation(false);
    onClose();
  };

  const handleBackToForm = () => {
    setShowConfirmation(false);
  };

  const isFormValid = formData.taskName.trim() !== "";

  if (showConfirmation) {
    return (
      <div className="add-task-modal-overlay" onClick={handleClose}>
        <div className="confirmation-modal-content" onClick={(e) => e.stopPropagation()}>
          <h2 className="confirmation-header">Confirm New Task</h2>
          <div className="confirmation-details">
            <div className="confirmation-item">
              <span className="confirmation-label">Task Name</span>
              <span className="confirmation-value">{formData.taskName}</span>
            </div>
            {formData.date && (
              <div className="confirmation-item">
                <span className="confirmation-label">Due Date</span>
                <span className="confirmation-value">{formData.date}</span>
              </div>
            )}
            {formData.assignedTo && (
              <div className="confirmation-item">
                <span className="confirmation-label">Assigned To</span>
                <span className="confirmation-value">{formData.assignedTo}</span>
              </div>
            )}
            {formData.committee && (
              <div className="confirmation-item">
                <span className="confirmation-label">Committee</span>
                <span className="confirmation-value">{formData.committee}</span>
              </div>
            )}
            <div className="confirmation-item">
              <span className="confirmation-label">Priority</span>
              <span className="confirmation-value">{formData.priority}</span>
            </div>
            {formData.link && (
              <div className="confirmation-item">
                <span className="confirmation-label">Link</span>
                <span className="confirmation-value">{formData.link}</span>
              </div>
            )}
            {formData.description && (
              <div className="confirmation-item">
                <span className="confirmation-label">Description</span>
                <span className="confirmation-value">{formData.description}</span>
              </div>
            )}
            <div className="confirmation-item">
              <span className="confirmation-label">Status</span>
              <span className="confirmation-value">{getColumnTitle()}</span>
            </div>
          </div>
          <div className="confirmation-buttons">
            <button className="confirm-yes-btn" onClick={handleConfirmCreate}>
              Yes
            </button>
            <button className="confirm-back-btn" onClick={handleBackToForm}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="add-task-modal-overlay" onClick={handleClose}>
      <div className="add-task-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className={`modal-color-label ${getColumnClass()}`}></div>
          <h2 className="modal-title">{getColumnTitle()}</h2>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Task Name *</label>
            <input
              type="text"
              name="taskName"
              className="form-input"
              placeholder="Enter task name"
              value={formData.taskName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                name="date"
                className="form-input"
                placeholder="Enter date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Assigned to</label>
              <input
                type="text"
                name="assignedTo"
                className="form-input"
                placeholder="Enter name (display only)"
                value={formData.assignedTo}
                onChange={handleInputChange}
              />
              <small style={{ color: '#999', fontSize: '12px', marginTop: '4px' }}>
                Note: This is for display only. User assignment coming soon.
              </small>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Committee Assigned</label>
              <input
                type="text"
                name="committee"
                className="form-input"
                placeholder="Enter committee name"
                value={formData.committee}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                name="priority"
                className="form-select"
                value={formData.priority}
                onChange={handleInputChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Link</label>
            <input
              type="url"
              name="link"
              className="form-input"
              placeholder="Enter link (optional)"
              value={formData.link}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-textarea"
              placeholder="Enter description (optional)"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="create-task-btn" disabled={!isFormValid}>
              + Create New Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;