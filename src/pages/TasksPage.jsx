import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask } from "../api/taskApi";
import { Link, useParams } from "react-router-dom";

export default function TasksPage() {
  const { id: plantId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const load = async () => {
    const res = await getTasks(plantId);
    setTasks(res.data);
  };

  useEffect(() => {
    // load();
  }, [plantId]);

  const submit = async (e) => {
    e.preventDefault();
    await createTask({ title, plantId });
    setTitle("");
    load();
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Tasks for Plant # {plantId}</h1>
        <Link to={`/plants/${plantId}`} className="btn-secondary">
          ← Back to Plant
        </Link>
      </div>

      <div className="form-card">
        <h3>Add Task</h3>
        <form onSubmit={submit} className="inline-form">
          <input 
            placeholder="Water Daily, Fertilize Weekly..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button className="btn-primary small">Add</button>
        </form>
      </div>

      <div className="card-grid" style={{marginTop:"1rem"}}>
        {tasks.map(t => (
          <div className="card list-item" key={t.id}>
            <span>{t.title}</span>
            <button className="btn-danger small" onClick={()=>deleteTask(t.id).then(load)}>✕</button>
          </div>
        ))}
        {tasks.length === 0 && <p className="muted">No tasks added yet.</p>}
      </div>
    </div>
  );
}
