// src/pages/Login.jsx
import { useState, useContext } from "react";
import { loginRequest } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginRequest({ email, password });
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#0f0820'
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#1a0f2e',
        padding: '2rem',
        borderRadius: '1rem',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ color: '#e8ff00', marginBottom: '2rem' }}>Login</h1>
        
        <input 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            color: 'white'
          }}
        />
        
        <input 
          placeholder="Password" 
          type="password" 
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            color: 'white'
          }}
        />
        
        <button type="submit" style={{
          width: '100%',
          padding: '0.75rem',
          background: '#8b5cf6',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;