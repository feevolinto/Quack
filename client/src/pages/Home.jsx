// src/pages/Home.jsx
import TeamCard from "../components/home/TeamCard";
import SummaryCards from "../components/home/SummaryCards";
import ProjectCard from "../components/common/ProjectCard";
import { mockTeam, mockStats, mockProjects } from "../utils/mockData";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="home-container">
        {/* Header */}
        <div className="home-header">
          <div className="home-logo-placeholder">
            <img src="/src/assets/home_iconlogo.svg" alt="Quack" className="brand-name-img" />
          </div>
          <h1 className="home-title">Home</h1>
        </div>

        {/* Top Section - Team Card & Summary */}
        <div className="home-top-section">
          <TeamCard name={mockTeam.name} role={mockTeam.role} />
          <SummaryCards stats={mockStats} />
        </div>

        {/* Ongoing Projects Section */}
        <div className="ongoing-section">
          <h2 className="ongoing-title">Ongoing projects</h2>
          <div className="projects-grid">
            {mockProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;