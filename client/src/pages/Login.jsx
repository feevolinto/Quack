// src/pages/Login.jsx
import { useState, useContext } from "react";
import { loginRequest } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("admin"); // 'admin' or 'user'
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // TEMPORARY: Test login bypass (remove this later when backend is ready)
    if (email === "test@test.com" && password === "test123") {
      const mockUser = {
        name: "Admin",
        email: "test@test.com",
        role: userType
      };
      login("test-token-123", mockUser);
      navigate("/");
      return;
    }

    try {
      const res = await loginRequest({ email, password, userType });
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background Gradient Placeholder */}
      <div className="login-background">
        <img src="/src/assets/background_login.png" alt="" />
      </div>

      {/* Left Side - Branding */}
      <div className="login-left">
        <div className="login-branding">
          <img src="/src/assets/logo_login.svg" alt="Quack" className="brand-name-img" />
        </div>

        <p className="brand-tagline">
          Your <span className="highlight">Task Management</span><br />
          Essential
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="login-right">
        <div className="login-container">
          <h2 className="login-title">Log in</h2>
          <p className="login-subtitle">as</p>

          {/* User Type Toggle */}
          <div className="user-type-toggle">
            <button
              type="button"
              className={`toggle-btn ${userType === "admin" ? "active" : ""}`}
              onClick={() => setUserType("admin")}
            >
              Admin
            </button>
            <button
              type="button"
              className={`toggle-btn ${userType === "user" ? "active" : ""}`}
              onClick={() => setUserType("user")}
            >
              User
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>

        {/* Footer Logo */}
        <div className="login-footer">
          <img src="/src/assets/logo_login_footer.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;