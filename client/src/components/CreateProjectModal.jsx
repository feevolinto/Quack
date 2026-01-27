import { useState } from "react";
import api from "../services/api";
import "../styles/CreateProjectModal.css";

function CreateProjectModal({ isOpen, onClose, onProjectCreated }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    leader: "",
    committee: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleConfirmCreate = async () => {
    setLoading(true);
    setError("");

    try {
      console.log("📡 Creating project:", formData);
      const newProject = await api.createProject(formData);
      console.log("✅ Project created:", newProject);
      
      onProjectCreated(newProject);
      handleClose();
    } catch (err) {
      console.error("❌ Failed to create project:", err);
      setError(err.message);
      setShowConfirmation(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      date: "",
      location: "",
      leader: "",
      committee: "",
      description: ""
    });
    setShowConfirmation(false);
    setError("");
    onClose();
  };

  const handleBackToForm = () => {
    setShowConfirmation(false);
  };

  const isFormValid = formData.name.trim() !== "";

  // ... rest of your modal code (confirmation and form JSX

  if (showConfirmation) {
    return (
      <div className="create-project-modal-overlay" onClick={handleClose}>
        <div className="project-confirmation-modal-content" onClick={(e) => e.stopPropagation()}>
          <h2 className="project-confirmation-header">Confirm New Project</h2>
          <div className="project-confirmation-details">
            <div className="project-confirmation-item">
              <span className="project-confirmation-label">Project Name</span>
              <span className="project-confirmation-value">{formData.name}</span>
            </div>
            {formData.date && (
              <div className="project-confirmation-item">
                <span className="project-confirmation-label">Date</span>
                <span className="project-confirmation-value">{formData.date}</span>
              </div>
            )}
            {formData.location && (
              <div className="project-confirmation-item">
                <span className="project-confirmation-label">Location</span>
                <span className="project-confirmation-value">{formData.location}</span>
              </div>
            )}
            {formData.leader && (
              <div className="project-confirmation-item">
                <span className="project-confirmation-label">Project Leader</span>
                <span className="project-confirmation-value">{formData.leader}</span>
              </div>
            )}
            {formData.committee && (
              <div className="project-confirmation-item">
                <span className="project-confirmation-label">Committee Assigned</span>
                <span className="project-confirmation-value">{formData.committee}</span>
              </div>
            )}
            {formData.description && (
              <div className="project-confirmation-item">
                <span className="project-confirmation-label">Description</span>
                <span className="project-confirmation-value">{formData.description}</span>
              </div>
            )}
          </div>
          <div className="project-confirmation-buttons">
            <button className="project-confirm-yes-btn" onClick={handleConfirmCreate}>
              Yes
            </button>
            <button className="project-confirm-back-btn" onClick={handleBackToForm}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="create-project-modal-overlay" onClick={handleClose}>
      <div className="create-project-modal-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="create-modal-title">New Project</h2>

        <form className="project-form" onSubmit={handleSubmit}>
          <div className="project-form-group">
            <label className="project-form-label">Project Name</label>
            <input
              type="text"
              name="name"
              className="project-form-input"
              placeholder="Enter project name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="project-form-row">
            <div className="project-form-group">
              <label className="project-form-label">Date</label>
              <input
                type="date"
                name="date"
                className="project-form-input"
                placeholder="Enter date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>

            <div className="project-form-group">
              <label className="project-form-label">Location</label>
              <input
                type="text"
                name="location"
                className="project-form-input"
                placeholder="Enter location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="project-form-group">
            <label className="project-form-label">Project Leader</label>
            <input
              type="text"
              name="leader"
              className="project-form-input"
              placeholder="Enter project leader"
              value={formData.leader}
              onChange={handleInputChange}
            />
          </div>

          <div className="project-form-group">
            <label className="project-form-label">Committee Assigned</label>
            <input
              type="text"
              name="committee"
              className="project-form-input"
              placeholder="Enter committee assigned"
              value={formData.committee}
              onChange={handleInputChange}
            />
          </div>

          <div className="project-form-group">
            <label className="project-form-label">Description</label>
            <textarea
              name="description"
              className="project-form-textarea"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="project-modal-actions">
            <button type="button" className="project-cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="project-create-btn" disabled={!isFormValid}>
              + Create New Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectModal;