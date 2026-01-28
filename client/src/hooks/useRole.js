// src/hooks/useRole.js

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Custom hook to check user roles
 * 
 * Usage:
 * const { isAdmin, isMember, hasRole } = useRole();
 * 
 * if (isAdmin) {
 *   // Show admin-only content
 * }
 */

export function useRole() {
  const { user } = useContext(AuthContext);
  
  // Get role from context or localStorage
  const userRole = user?.role || localStorage.getItem("userRole");
  
  return {
    userRole,
    isAdmin: userRole === "admin",
    isMember: userRole === "member",
    hasRole: (role) => userRole === role,
    canCreate: userRole === "admin", // Only admins can create
    canEdit: userRole === "admin",   // Only admins can edit
    canDelete: userRole === "admin", // Only admins can delete
    canView: true // Everyone can view
  };
}

export default useRole;