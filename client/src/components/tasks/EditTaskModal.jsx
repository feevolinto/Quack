// src/components/tasks/EditTaskModal.jsx
import { useState, useEffect } from "react";
import "../../styles/AddTaskModal.css";

function EditTaskModal({ isOpen, onClose, task, onUpdateTask }) {
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

  useEffect(() => {
    if (task) {
      setFormData({
        taskName: task.name || "",
        date: task.date || "",
        assignedTo: task.assignedTo || "",
        committee: task.committee || "",
        link: task.link || "",
        description: task.description || "",
        priority: task.priority || "Medium"
      });
    }
  }, [task]);

  if (!isOpen) return null;

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

  const handleConfirmUpdate = () => {
    const updatedTask = {
      ...task,
      name: formData.taskName,
      priority: formData.priority,
      assignedTo: formData.assignedTo,
      committee: formData.committee,
      days: formData.date ? calculateDaysLeft(formData.date) : task.days,
      date: formData.date,
      link: formData.link,
      description: formData.description
    };
    
    onUpdateTask(updatedTask);
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
          <h2 className="confirmation-header">Confirm Task Update</h2>
          <div className="confirmation-details">
            <div className="confirmation-item">
              <span className="confirmation-label">Task Name</span>
              <span className="confirmation-value">{formData.taskName}</span>
            </div>
            {formData.date && (
              <div className="confirmation-item">
                <span className="confirmation-label">Date</span>
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
          </div>
          <div className="confirmation-buttons">
            <button className="confirm-yes-btn" onClick={handleConfirmUpdate}>
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
          <h2 className="modal-title" style={{ color: '#f0e100' }}>Edit Task</h2>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Task Name</label>
            <input
              type="text"
              name="taskName"
              className="form-input"
              placeholder="Enter project name"
              value={formData.taskName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Date</label>
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
                placeholder="Enter location"
                value={formData.assignedTo}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Committee Assigned</label>
              <input
                type="text"
                name="committee"
                className="form-input"
                placeholder="Enter committee assigned"
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
              placeholder="Enter link"
              value={formData.link}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-textarea"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="create-task-btn" disabled={!isFormValid}>
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;