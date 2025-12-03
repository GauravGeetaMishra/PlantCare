import { useEffect, useState } from "react";
import { getReports, createReport, deleteReport } from "../api/aiReportApi";
import { Link, useParams } from "react-router-dom";
import "../Styles/ReportPage.css";

export default function ReportsPage() {
  const { id: plantId } = useParams();
  const [summary,setSummary] = useState("");
  const [reports,setReports] = useState([]);

  const load = async ()=> {
    const res = await getReports(plantId);
    setReports(res.data);
  }

  useEffect(()=>{ load(); },[plantId]);

  const submit=async(e)=>{
    e.preventDefault();
    await createReport({summary,plantId});
    setSummary("");
    load();
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">AI Reports for Plant # {plantId}</h1>
        <Link to={`/plants/${plantId}`} className="btn-secondary">
          ← Back to Plant
        </Link>
      </div>

      <div className="form-card">
        <h3>Add AI Summary</h3>
        <form onSubmit={submit} className="inline-form">
          <input 
            placeholder="Leaf yellowing detected..."
            value={summary}
            onChange={(e)=>setSummary(e.target.value)}
            required/>
          <button className="btn-primary small">Add Report</button>
        </form>
      </div>

      <div className="card-grid" style={{marginTop:"1rem"}}>
        {reports.map(r=>(
          <div className="card list-item" key={r.id}>
            <span>{r.summary}</span>
            <button className="btn-danger small" onClick={()=>deleteReport(r.id).then(load)}>✕</button>
          </div>
        ))}
        {reports.length === 0 && <p className="muted">No reports yet.</p>}
      </div>
    </div>
  );
}
