import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlants, updatePlant } from "../api/plantApi";
import "../Styles/PlantEdit.css";

export default function PlantEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({ name: "", species: "", notes: "" });
  const [loading, setLoading] = useState(true);
  // Load selected plant
  useEffect(() => {
    const fetchPlant = async () => {
      const res = await getPlants(user.id);
      const plant = res.data.find((p) => p.id === Number(id));
      if (plant) setForm(plant);
      setLoading(false);
    };
    fetchPlant();
  }, [id, user.id]);
  const change = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // Update plant
  const submit = async (e) => {
    e.preventDefault();
    await updatePlant(id, form);
    navigate("/plants");
  };
  if (loading) return <p>Loading...</p>;
  return (
    <div className="page edit-page">
      <header className="page-header">
        <h1>Edit Plant</h1>
        <p>Modify plant details below and save changes.</p>
      </header>
      <form onSubmit={submit} className="form-card">
        <label>Name</label>
        <input name="name" value={form.name} onChange={change} required />
        <label>Species</label>
        <input name="species" value={form.species} onChange={change} />
        <label>Notes</label>
        <textarea name="notes" value={form.notes} onChange={change} />
        <div className="btn-row">
          <button type="submit">Save Changes</button>
          <button type="button" className="secondary" onClick={() => navigate("/plants")}>
            ← Cancel
          </button>
        </div>
      </form>
    </div>
  );
}