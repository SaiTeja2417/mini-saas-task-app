import { Trash2 } from "lucide-react";

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded shadow">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.status === "completed"}
          onChange={() => onToggle(task)}
        />
        <div>
          <p>{task.title}</p>
          <span className="text-sm text-yellow-600">
            {task.status === "pending" ? "Pending" : "Completed"}
          </span>
        </div>
      </div>

      <button onClick={() => onDelete(task.id)} className="text-red-500">
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TaskItem;