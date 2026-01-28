// src/components/common/RoleProtected.jsx

/**
 * Component to conditionally render content based on user role
 * 
 * Usage:
 * <RoleProtected allowedRoles={['admin']}>
 *   <button>Admin Only Action</button>
 * </RoleProtected>
 * 
 * With fallback:
 * <RoleProtected allowedRoles={['admin']} fallback={<span>Read Only</span>}>
 *   <button>Admin Action</button>
 * </RoleProtected>
 */

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function RoleProtected({ children, allowedRoles = ['admin'], fallback = null }) {
  const { user } = useContext(AuthContext);
  
  // Get role from user context or localStorage
  const userRole = user?.role || localStorage.getItem("userRole");
  
  // Check if user has permission
  const hasPermission = allowedRoles.includes(userRole);
  
  // If no permission, show fallback (or nothing)
  if (!hasPermission) {
    return fallback;
  }
  
  // User has permission, show the content
  return <>{children}</>;
}

export default RoleProtected;