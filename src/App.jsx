import { useState, useEffect } from "react";
import { signup, login, getTasks, deleteTask } from "./api";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
  }, []);

  const handleSignup = async () => {
    const res = await signup(username, password);
    setMessage(res.message || "Signed up successfully!");
  };

  const handleLogin = async () => {
    const res = await login(username, password);
    if (res.token) {
      localStorage.setItem("token", res.token);
      setToken(res.token);
      setMessage("Login successful ✅");
    } else {
      setMessage(res.message || "Login failed ❌");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setTasks([]);
    setMessage("Logged out.");
  };

  const handleLoadTasks = async () => {
    const res = await getTasks(token);
    setTasks(res);
    setMessage("Tasks loaded.");
  };

  const handleAddTask = async () => {
    await fetch("https://todo-api-pfod.onrender.com/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTask }),
    });
    setNewTask("");
    setMessage("Task added.");
    handleLoadTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id, token);
    setMessage("Task deleted.");
    handleLoadTasks();
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h2>📝 TODO App</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}

      {!token ? (
        <>
          <h4>Login or Sign up</h4>
          <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button disabled={!username || !password} onClick={handleSignup}>Sign Up</button>
          <button disabled={!username || !password} onClick={handleLogin}>Log In</button>
        </>
      ) : (
        <>
          <p>Welcome, <strong>{username || "User"}</strong>!</p>
          <button onClick={handleLogout}>Log Out</button>
          <hr />

          <button onClick={handleLoadTasks}>Load My Tasks</button>
          <div style={{ marginTop: "1rem" }}>
            <input
              placeholder="New Task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button disabled={!newTask} onClick={handleAddTask}>Add Task</button>
          </div>

          <ul style={{ marginTop: "1rem" }}>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <li key={task._id}>
                  {task.title}
                  <button style={{ marginLeft: "10px" }} onClick={() => handleDeleteTask(task._id)}>
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p>No tasks yet.</p>
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
