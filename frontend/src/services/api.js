const API = "http://localhost:5000/api";

export const loginUser = async (data) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const signupUser = async (data) => {
  const res = await fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getTasks = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const addTask = async (title) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  return res.json();
};

export const updateTask = async (id, status) => {
  const token = localStorage.getItem("token");
  await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
};

export const deleteTask = async (id) => {
  const token = localStorage.getItem("token");
  await fetch(`${API}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};