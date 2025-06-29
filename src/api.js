const API_BASE = "https://todo-api-pfod.onrender.com/api";

// ✅ Signup
export const signup = async (username, password) => {
  try {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });
    return await res.json();
  } catch (err) {
    console.error("❌ Signup error:", err);
    return { message: "Signup failed." };
  }
};

// ✅ Login
export const login = async (username, password) => {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });
    return await res.json();
  } catch (err) {
    console.error("❌ Login error:", err);
    return { message: "Login failed." };
  }
};

// ✅ Get Tasks (requires token)
export const getTasks = async (token) => {
  try {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || `HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Failed to load tasks:", err.message);
    return [];
  }
};

// ✅ Delete Task
export const deleteTask = async (id, token) => {
  try {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error(`❌ Failed to delete task ${id}:`, err.message);
    return null;
  }
};
