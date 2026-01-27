import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // ✅ Changed from "token" to "authToken" to match api.js
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;