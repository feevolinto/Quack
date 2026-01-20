// src/components/Sidebar.jsx
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Sidebar.css";

function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/history", label: "History" },
  ];

  return (
    <aside className="sidebar">
      
      <div className="sidebar-logo">
        <img src="/src/assets/home_textlogo.svg" alt="Quack" className="brand-name-img" />
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
            end={item.path === "/"}
          >
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;