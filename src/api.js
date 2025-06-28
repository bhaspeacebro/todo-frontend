const API = "https://todo-api-pfod.onrender.com/api";

// Create a new user
export const signup = (username, password) =>
  fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json());

// Log in and receive JWT token
export const login = (username, password) =>
  fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json());

// Get all tasks for the authenticated user
export const getTasks = (token) =>
  fetch(`${API}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());

// Delete a specific task by ID
export const deleteTask = (taskId, token) =>
  fetch(`${API}/tasks/${taskId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());
