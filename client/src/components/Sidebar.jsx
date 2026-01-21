// src/components/Sidebar.jsx
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Sidebar.css";
import homeIcon from "../assets/home.svg";
import dashboardIcon from "../assets/dashboard.svg";
import historyIcon from "../assets/history.svg";
import logo from "../assets/home_textlogo.svg";

function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

const navItems = [
  { path: "/", label: "Home", icon: homeIcon },
  { path: "/dashboard", label: "Dashboard", icon: dashboardIcon },
  { path: "/history", label: "History", icon: historyIcon },
];


  return (
    <aside className="sidebar">
      
      <div className="sidebar-logo">
  <img src={logo} alt="Quack" className="brand-name-img" />
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
      <img src={item.icon} alt={item.label} className="nav-icon" />
      <span className="nav-label">{item.label}</span>
    </NavLink>
  ))}
</nav>


      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        <span className="nav-icon">🚪</span>
        <span className="nav-label">Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;