import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskItem from "../components/TaskItem";
import { getTasks, addTask, updateTask, deleteTask } from "../services/api";
import toast from "react-hot-toast";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchData = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadTasks();
  }, []);

const handleAdd = async (e) => {
  e.preventDefault();

  if (!title.trim()) {
    return toast.error("Task cannot be empty");
  }

  const loading = toast.loading("Adding task...");

  try {
    await addTask(title);
    toast.dismiss(loading);
    toast.success("Task added ✅");

    setTitle("");
    fetchData();
  } catch {
    toast.dismiss(loading);
    toast.error("Failed to add task ❌");
  }
};

  const handleToggle = async (task) => {
    await updateTask(
      task.id,
      task.status === "pending" ? "completed" : "pending"
    );
    toast.success("Task updated 🔄");
    fetchData();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    toast.success('Task Deleted')
    fetchData();
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "pending") return t.status === "pending";
    if (filter === "completed") return t.status === "completed";
    return true;
  });

  const pending = tasks.filter((t) => t.status === "pending").length;
  const completed = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar email={localStorage.getItem("email")} />

      <div className="mx-auto p-6 space-y-6">

        {/* 🔷 STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-blue-500 min-h-[120px] flex flex-col justify-center">
            <p className="text-gray-500 text-sm">Total Tasks</p>
            <h2 className="text-3xl font-bold">{tasks.length}</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-yellow-500 min-h-[120px] flex flex-col justify-center">
            <p className="text-gray-500 text-sm">Pending</p>
            <h2 className="text-3xl font-bold">{pending}</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-green-500 min-h-[120px] flex flex-col justify-center">
            <p className="text-gray-500 text-sm">Completed</p>
            <h2 className="text-3xl font-bold">{completed}</h2>
          </div>
        </div>

        {/* 🔷 ADD TASK */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-lg font-semibold mb-4">Add New Task</h2>

          <form onSubmit={handleAdd} className="flex gap-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter task..."
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* 🔷 TASK LIST */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">My Tasks</h2>

            <div className="flex gap-2">
              {["all", "pending", "completed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${filter === f
                      ? f === "pending"
                        ? "bg-yellow-500 text-white"
                        : f === "completed"
                          ? "bg-green-600 text-white"
                          : "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No tasks found
              </div>
            ) : (
              filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;