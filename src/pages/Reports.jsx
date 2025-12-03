import { useEffect, useState } from "react";
import { createReport, sendReportsEmail } from "../api/aiReportApi";
import { getTasks } from "../api/taskApi";
import "../Styles/Reports.css";

export default function Reports({ plantId }) {

  const user = JSON.parse(localStorage.getItem("user"));

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadData();
  }, [plantId]);

  useEffect(() => {
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const taskList = await getTasks(plantId);
      setTasks(taskList.data || []);
    } catch (err) {
      console.log("Error fetching tasks", err);
    }
  };

  const addReport = async (taskName) => {
    await createReport({
      userId: user.id,
      plantId,
      taskName
    });
  };

  const sendEmail = async () => {
    await sendReportsEmail(plantId, user.email);
    alert("Email sent");
  };

  return (
    <div className="reports-container">
      <h2 className="reports-title">Plant Reports</h2>
      <div className="green-line"></div>

      <h3 className="section-title">Tasks</h3>

      <ul className="task-list">
        {tasks.map(t => (
          <li key={t.id} className="task-item">
            <span className="task-name">{t.title}</span>
           
          </li>
        ))}

        {tasks.length === 0 && (
          <p className="no-tasks">No tasks found.</p>
        )}
      </ul>

      <button onClick={sendEmail} className="btn-email">
        Send Email
      </button>
    </div>
  );
}
