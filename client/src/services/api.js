// src/services/api.js

// Base URL of your backend server
const API_BASE_URL = "http://localhost:3000/api";

/**
 * Helper function to make authenticated API calls
 */
const apiRequest = async (endpoint, options = {}) => {
  // Get token from localStorage
  const token = localStorage.getItem("authToken");

  // Default headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Add authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    // If response is not OK, throw error
    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Export all API functions
export const api = {
  // ============ AUTH ============
  login: async (email, password, role) => {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    });

    // Store token in localStorage
    if (data.token) {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userRole", data.user.role);
    }

    return data;
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
  },

  getMe: () => apiRequest("/users/me"),

  // ============ PROJECTS ============
  createProject: (projectData) =>
    apiRequest("/projects", {
      method: "POST",
      body: JSON.stringify(projectData),
    }),

  getMyProjects: () => apiRequest("/projects"),

  // ⚠️ UPDATE PROJECT - Missing from backend!
  // You'll need to add this endpoint

  // ⚠️ DELETE PROJECT - Missing from backend!
  // You'll need to add this endpoint

  // ============ TASKS ============
  createTask: (taskData) =>
    apiRequest("/tasks", {
      method: "POST",
      body: JSON.stringify(taskData),
    }),

  // ⚠️ IMPORTANT: Your backend uses boardId, but you might need projectId
  getTasksByBoard: (boardId) => apiRequest(`/tasks/board/${boardId}`),

  updateTask: (taskId, updates) =>
    apiRequest(`/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),

  updateTaskStatus: (taskId, status) =>
    apiRequest(`/tasks/${taskId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  deleteTask: (taskId) =>
    apiRequest(`/tasks/${taskId}`, {
      method: "DELETE",
    }),

  // ============ BOARDS ============
  createBoard: (boardData) =>
    apiRequest("/boards", {
      method: "POST",
      body: JSON.stringify(boardData),
    }),

  getBoardsByUser: (userId) => apiRequest(`/boards/user/${userId}`),
};

export default api;