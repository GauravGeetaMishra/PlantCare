import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask } from "../api/taskApi";
import "./tasks.css";
export default function Tasks({ plantId }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const load = async () => {
    const res = await getTasks(plantId);
    setTasks(res.data);
  };

  useEffect(() => {
    load();
  }, [plantId]);

  const submit = async (e) => {
    e.preventDefault();
    await createTask({ title, plantId, description: "" });
    setTitle("");
    load();
  };

  return (
    <div className="sub-section">
      <div className="sub-header">
        <h3>Tasks</h3>
       
      </div>

      <form onSubmit={submit} className="inline-form">
        <input
          placeholder="New task (e.g. Water, Fertilize...)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary small">
          Add
        </button>
      </form>

      <ul className="list">
        {tasks.map((t) => (
          <li key={t.id} className="list-item">
            <span>{t.title}</span>
            <button
              className="btn-danger small"
              onClick={() => deleteTask(t.id).then(load)}
            >
              delete
            </button>
          </li>
        ))}
        {tasks.length === 0 && (
          <p className="muted small-text">No tasks yet.</p>
        )}
      </ul>
    </div>
  );
}
