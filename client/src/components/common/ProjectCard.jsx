// src/components/common/ProjectCard.jsx
function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-card-content">
        <p className="project-date">{project.date}</p>
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
            {/* Icon placeholder */}
            <span className="days-icon">⏱</span>
            <span className="days-text">{project.daysRemaining} days</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;