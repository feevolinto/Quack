// src/components/common/ProjectCard.jsx
import timeIcon from "../../assets/time.svg";

function ProjectCard({ project, onClick }) {
  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="project-card" onClick={onClick}>
      <div className="project-card-content">
        <p className="project-date">{formatDate(project.date)}</p>
        <h3 className="project-name">{project.name}</h3>
        <p className="project-location">Location:</p>
        <p className="project-location-detail">{project.location}</p>
        
        <div className="project-divider"></div>
        
        <div className="project-footer">
          <div className="progress-section">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <span className="progress-text">{project.progress}% completed</span>
          </div>
          
          <div className="days-left">
            <span className="days-icon">
              <img src={timeIcon} alt="time-left" className="nav-icon" />
            </span>
            <span className="days-text">{project.daysRemaining} days</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;