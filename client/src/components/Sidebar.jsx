// src/components/Sidebar.jsx
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Sidebar.css";
import homeIcon from "../assets/home.svg";
import dashboardIcon from "../assets/dashboard.svg";
import historyIcon from "../assets/history.svg";
import logo from "../assets/home_textlogo.svg";
import logoutIcon from "../assets/logout.svg";

function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Get user info with fallbacks
  const userEmail = user?.email || localStorage.getItem("userEmail") || "user@example.com";
  const userRole = user?.role || localStorage.getItem("userRole") || "member";
  
  // Extract name from email (before @)
  const getUserName = () => {
    if (user?.name) return user.name;
    
    // Get name from email
    const emailName = userEmail.split("@")[0];
    
    // Capitalize first letter of each word
    return emailName
      .split(/[._-]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get first letter for avatar
  const getAvatarLetter = () => {
    const name = getUserName();
    return name.charAt(0).toUpperCase();
  };

  // Format role for display
  const getDisplayRole = () => {
    if (userRole === "admin") return "Admin";
    if (userRole === "member") return "Member";
    return userRole.charAt(0).toUpperCase() + userRole.slice(1);
  };

  const navItems = [
    { path: "/", label: "Home", icon: homeIcon },
    { path: "/dashboard", label: "Dashboard", icon: dashboardIcon },
    { path: "/history", label: "History", icon: historyIcon },
  ];

  console.log("👤 Sidebar user info:", { userEmail, userRole, name: getUserName() });

  return (
    <aside className="sidebar">
      
      <div className="sidebar-logo">
        <img src={logo} alt="Quack" className="brand-name-img" />
      </div>

      {/* User Profile */}
      <div className="user-profile">
        <div className="user-avatar" style={{
          background: userRole === "admin" 
            ? "linear-gradient(135deg, #834dfb 0%, #9d6bff 100%)" 
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        }}>
          {getAvatarLetter()}
        </div>
        <div className="user-info">
          <p className="user-name">{getUserName()}</p>
          <span className="user-role">{getDisplayRole()}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
            end={item.path === "/"}
          >
            <img src={item.icon} alt={item.label} className="nav-icon" />
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        <img src={logoutIcon} alt="Logout" className="nav-icon" />
        <span className="nav-label">Logout</span>
      </button>

    </aside>
  );
}

export default Sidebar;