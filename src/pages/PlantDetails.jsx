import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlant } from "../api/plantApi";
import Tasks from "./Tasks";
import Reports from "./Reports";

export default function PlantDetails() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    getPlant(id).then((res) => setPlant(res.data));
  }, [id]);

  if (!plant) return <h2 className="page">Loading...</h2>;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">{plant.name}</h1>
        <p className="page-subtitle">
          Species: <b>{plant.species || "Unknown"}</b>
        </p>
      </div>

      {plant.notes && <p className="plant-notes">{plant.notes}</p>}

      <div className="two-column stacked">
        <Tasks plantId={id} />
        <Reports plantId={id} />
      </div>
    </div>
  );
}
