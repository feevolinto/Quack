// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login function - now uses api.login from our api.js
  const login = (token, userData) => {
    console.log("🔐 AuthContext: Logging in user", userData);
    
    // Store token
    localStorage.setItem("authToken", token);
    localStorage.setItem("userEmail", userData.email);
    localStorage.setItem("userRole", userData.role);
    
    // Set user state
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    console.log("👋 AuthContext: Logging out user");
    
    // Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    
    // Clear user state
    setUser(null);
  };

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      const email = localStorage.getItem("userEmail");
      const role = localStorage.getItem("userRole");

      if (token && email && role) {
        console.log("✅ AuthContext: Found stored credentials", { email, role });
        
        try {
          // Optional: Verify token is still valid by calling /users/me
          const response = await api.getMe();
          console.log("✅ AuthContext: Token verified", response);
          
          // Set user from verified response
          setUser({
            email: response.user.email,
            role: response.user.role,
            id: response.user.id
          });
        } catch (error) {
          console.error("❌ AuthContext: Token verification failed", error);
          
          // Token is invalid, clear everything
          logout();
        }
      } else {
        console.log("ℹ️ AuthContext: No stored credentials found");
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Export both for flexibility
export { AuthProvider };
export default AuthProvider;