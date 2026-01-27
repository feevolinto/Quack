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

    // Store token and user info in localStorage
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

  getProjectById: (projectId) => apiRequest(`/projects/${projectId}`),

  updateProject: (projectId, updates) =>
    apiRequest(`/projects/${projectId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),

  deleteProject: (projectId) =>
    apiRequest(`/projects/${projectId}`, {
      method: "DELETE",
    }),

  // ============ TASKS ============
  createTask: (taskData) =>
    apiRequest("/tasks", {
      method: "POST",
      body: JSON.stringify(taskData),
    }),

  getTasksByProject: (projectId) => apiRequest(`/tasks/project/${projectId}`),

  getTaskById: (taskId) => apiRequest(`/tasks/${taskId}`),

  updateTask: (taskId, updates) =>
    apiRequest(`/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
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

  getMyBoards: () => apiRequest("/boards"),

  getBoardById: (boardId) => apiRequest(`/boards/${boardId}`),

  updateBoard: (boardId, updates) =>
    apiRequest(`/boards/${boardId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),

  deleteBoard: (boardId) =>
    apiRequest(`/boards/${boardId}`, {
      method: "DELETE",
    }),
};

export default api;