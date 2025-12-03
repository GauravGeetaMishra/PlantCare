import { useEffect, useState, useCallback } from "react";
import { getPlants, createPlant, deletePlant } from "../api/plantApi";
import { useNavigate } from "react-router-dom";
import "../Styles/Plant.css";

export default function Plants() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [plants, setPlants] = useState([]);
  const [form, setForm] = useState({ name: "", species: "", notes: "" });
  const navigate = useNavigate();

  const load = useCallback(async () => {
    if (!user) return;
    try {
      const res = await getPlants(user.id);
      setPlants(res.data || []);
    } catch (err) {
      console.error("Unable to load plants:", err);
    }
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const change = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createPlant({ ...form, ownerId: user.id });
      setForm({ name: "", species: "", notes: "" });
      load();
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  const remove = async (id) => {
    await deletePlant(id);
    load();
  };

  return (
    <div className="page plants-page">
      <header className="page-header">
        <h1>My Plants</h1>
        <p>Track and manage all your plants in one place.</p>
      </header>

      <section className="form-card">
        <h2>Add New Plant</h2>
        <form onSubmit={submit}>
          <label>Name</label>
          <input name="name" value={form.name} onChange={change} required />
          <label>Species</label>
          <input name="species" value={form.species} onChange={change} />
          <label>Notes</label>
          <textarea name="notes" value={form.notes} onChange={change} />
          <button type="submit">Add Plant</button>
        </form>
      </section>

      <section className="plant-list">
        <h2>Plant Collection</h2>
        <div className="grid">
          {plants.map((p) => (
            <div className="plant-card" key={p.id}>
              <h3>{p.name}</h3>
              <p className="muted">{p.species}</p>
              {p.notes && <p className="notes">{p.notes}</p>}
              <div className="actions">
                <button
                  className="btn-secondary small"
                  onClick={() => navigate(`/plants/${p.id}`)}
                >
                  View Details
                </button>
                <button onClick={() => navigate(`/plants/edit/${p.id}`)}>
                  Edit
                </button>
                <button className="danger" onClick={() => remove(p.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          {plants.length === 0 && <p className="muted">No plants yet. Add one above!</p>}
        </div>
      </section>
    </div>
  );
}
