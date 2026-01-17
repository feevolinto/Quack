// src/components/Sidebar.jsx
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { path: "/", icon: "🏠", label: "Home" },
    { path: "/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/history", icon: "🕐", label: "History" },
  ];

  return (
    <aside className="sidebar">
      {/* Logo Placeholder */}
      <div className="sidebar-logo">
        <div className="logo-icon-placeholder">
          {/* Replace this div with your logo image later */}
          <span className="logo-letter">Q</span>
        </div>
        <h1 className="logo-text">quack</h1>
      </div>

      {/* User Profile */}
      <div className="user-profile">
        <div className="user-avatar">
          {user?.name?.charAt(0).toUpperCase() || "A"}
        </div>
        <div className="user-info">
          <p className="user-name">{user?.name || "Admin"}</p>
          <span className="user-role">Role</span>
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
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        <span className="nav-icon">🚪</span>
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;