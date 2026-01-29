// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TeamCard from "../components/home/TeamCard";
import SummaryCards from "../components/home/SummaryCards";
import ProjectCard from "../components/common/ProjectCard";
import api from "../services/api";
import toast from "../utils/toast";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    allDeliverables: 0,
    toDo: 0,
    inProgress: 0,
    finished: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setError(null);
      console.log("📡 Loading home data...");

      // Load projects
      const projectsData = await api.getMyProjects();
      console.log("✅ Projects loaded:", projectsData);

      if (!projectsData || projectsData.length === 0) {
        console.log("ℹ️ No projects found");
        setProjects([]);
        setStats({
          allDeliverables: 0,
          toDo: 0,
          inProgress: 0,
          finished: 0
        });
        setLoading(false);
        return;
      }

      // Collect all tasks from all projects
      let allTasks = [];
      
      // Load tasks for each project
      const projectsWithProgress = await Promise.all(
        projectsData.map(async (project) => {
          try {
            const tasks = await api.getTasksByProject(project._id);
            console.log(`📋 Tasks for project ${project.name}:`, tasks);
            
            // Add these tasks to our collection
            if (tasks && Array.isArray(tasks)) {
              allTasks = [...allTasks, ...tasks];
            }
            
            // Calculate progress for this project
            const totalTasks = tasks?.length || 0;
            const completedTasks = tasks?.filter(t => 
              t.status === "finished" || t.status === "completed"
            ).length || 0;
            const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
            
            // Calculate days remaining (using dueDate if available, otherwise project.date)
            let daysRemaining = 0;
            const projectDate = project.date || project.dueDate;
            
            if (projectDate) {
              const dueDate = new Date(projectDate);
              const today = new Date();
              today.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison
              const diffTime = dueDate - today;
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              daysRemaining = diffDays > 0 ? diffDays : 0;
            }
            
            return {
              _id: project._id,
              id: project._id, // Some components might use 'id'
              name: project.name,
              date: project.date,
              location: project.location,
              leader: project.leader || project.lead,
              description: project.description,
              status: project.status || "active",
              progress: progress,
              completedTasks: completedTasks,
              totalTasks: totalTasks,
              daysRemaining: daysRemaining
            };
          } catch (err) {
            console.error(`❌ Failed to load tasks for project ${project._id}:`, err);
            toast.warning(`Could not load tasks for ${project.name}`);
            return {
              _id: project._id,
              id: project._id,
              name: project.name,
              date: project.date,
              location: project.location,
              leader: project.leader || project.lead,
              description: project.description,
              status: project.status || "active",
              progress: 0,
              completedTasks: 0,
              totalTasks: 0,
              daysRemaining: 0
            };
          }
        })
      );

      console.log("✅ Projects with progress:", projectsWithProgress);
      console.log("📊 All tasks collected:", allTasks);

      setProjects(projectsWithProgress);

      // Calculate overall stats from all tasks
      const todoTasks = allTasks.filter(t => t.status === "todo").length;
      const inProgressTasks = allTasks.filter(t => t.status === "in-progress").length;
      const finishedTasks = allTasks.filter(t => 
        t.status === "finished" || t.status === "completed"
      ).length;
      const totalTasks = allTasks.length;

      const calculatedStats = {
        allDeliverables: totalTasks,
        toDo: todoTasks,
        inProgress: inProgressTasks,
        finished: finishedTasks
      };

      console.log("✅ Stats calculated:", calculatedStats);
      setStats(calculatedStats);

    } catch (err) {
      console.error("❌ Failed to load home data:", err);
      setError(err.message);
      toast.error("Failed to load home data");
      
      // If unauthorized, redirect to login
      if (err.message.includes("token") || err.message.includes("401") || err.message.includes("Invalid token")) {
        console.log("🔐 Token invalid, redirecting to login...");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProjectClick = (projectId) => {
    console.log("📍 Navigating to project:", projectId);
    navigate(`/dashboard/project/${projectId}`);
  };

  if (loading) {
    return (
      <div className="home-page">
        <div className="home-container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            color: 'white',
            fontSize: '18px'
          }}>
            Loading home data...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <div className="home-container">
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            color: 'white',
            fontSize: '16px',
            gap: '20px'
          }}>
            <p style={{ color: '#e74c3c' }}>Error loading data: {error}</p>
            <button 
              onClick={loadHomeData}
              style={{
                padding: '10px 20px',
                background: '#834dfb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Get only active/ongoing projects
  const ongoingProjects = projects.filter(p => p.status === "active");

  console.log("🏠 Rendering home with:", {
    totalProjects: projects.length,
    ongoingProjects: ongoingProjects.length,
    stats
  });

  return (
    <div className="home-page">
      <div className="home-container">
        {/* Header */}
        <div className="home-logo-placeholder">
          <img src="/src/assets/home_iconlogo.svg" alt="Quack" className="brand-name-img" />
        </div>
        <div className="home-header">
          <h1 className="home-title">Home</h1>
        </div>

        {/* Top Section - Team Card & Summary */}
        <div className="home-top-section">
          <TeamCard name="AWS Cloud Club UP Mindanao" role="Team" />
          <SummaryCards stats={stats} />
        </div>

        {/* Ongoing Projects Section */}
        <div className="ongoing-section">
          <h2 className="ongoing-title">Ongoing projects</h2>
          <div className="projects-grid">
            {ongoingProjects.length === 0 ? (
              <p style={{ color: 'white', fontSize: '16px' }}>
                No ongoing projects. Create one from the Dashboard to get started!
              </p>
            ) : (
              ongoingProjects.map((project) => (
                <ProjectCard 
                  key={project._id} 
                  project={project}
                  onClick={() => handleProjectClick(project._id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;