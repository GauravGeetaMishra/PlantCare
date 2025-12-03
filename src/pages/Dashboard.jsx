import { Link } from "react-router-dom";
import { Card, Row, Col, ListGroup, ProgressBar } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { useState, useEffect } from "react";
import { getPlants, createPlant, deletePlant } from "../api/plantApi";
import { getTasks } from "../api/taskApi";
import { getReports } from "../api/aiReportApi";
import "../Styles/dashboard.css";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "USER";

  /*  STATE VALUES */
  const [plants, setPlants] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const [form, setForm] = useState({ name: "", species: "", notes: "" });

  /*  LOAD EVERYTHING */
  const load = async () => {
    const res = await getPlants(user.id);
    const plantList = res.data;
    setPlants(plantList);

    let totalTasks = 0;
    let totalReports = 0;

    for (const p of plantList) {
      const taskRes = await getTasks(p.id);
      totalTasks += taskRes.data.length;

      const reportRes = await getReports(p.id);
      totalReports += reportRes.data.length;
    }

    setTaskCount(totalTasks);
    setReportCount(totalReports);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await createPlant({ ...form, ownerId: user.id });
    setForm({ name: "", species: "", notes: "" });
    load();
  };

  return (
    <div className="page dashboard p-3">

      {/*  SLIDER */}
      <Carousel fade interval={3000} className="rounded-4 overflow-hidden shadow-lg">
        <Carousel.Item>
          <img className="d-block w-100" src="/slide1.jpg" alt="First slide" />
          <Carousel.Caption>
            <h3>Every Plant Matters</h3>
            <p>Give each plant the attention it deserves.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src="/slide2.jpg" alt="Second slide" />
          <Carousel.Caption>
            <h3>Never Miss a Watering</h3>
            <p>Smart reminders keep your plants healthy.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src="/slide3.jpg" alt="Third slide" />
          <Carousel.Caption>
            <h3>Grow Confidently</h3>
            <p>Track progress and boost your gardening skills.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* 🔹 GREETING */}
      <div className="dashboard-header text-center my-5">
        <h1 className="page-title">Hi, {user.name} </h1>
        <p className="page-subtitle">Welcome to your PlantCare control center.</p>
      </div>

      {/*  LIVE STATS FROM API */}
      <Row className="g-4 my-4">
        {[
          { title: "Total Plants", value: plants.length, color: "#7ed957" },
          { title: "Total Tasks", value: taskCount, color: "#4fbf26" },
          { title: "AI Reports", value: reportCount, color: "#388e3c" }
        ].map((item, index) => (
          <Col md={4} key={index}>
            <Card
              className="shadow-lg border-0 rounded-4 text-center p-3 stat-card"
              style={{ background: item.color, color: "#fff" }}
            >
              <h4>{item.title}</h4>
              <h2 style={{ fontWeight: 700 }}>{item.value}</h2>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 🔹 PROGRESS BAR CARD */}
      <Card className="shadow-lg border-0 rounded-4 my-5 p-4">
        <h5 className="fw-bold mb-3"> Plant Growth & Care Progress</h5>
        <p>Watering Routine</p>
        <ProgressBar now={75} className="mb-3" />
        <p>Nutrient Supply</p>
        <ProgressBar variant="success" now={50} className="mb-3" />
        <p>Sunlight Exposure</p>
        <ProgressBar variant="warning" now={90} />
      </Card>

      {/* 🔹 RECENT ACTIVITY (static until tasks API history is built) */}
      <Card className="shadow-lg border-0 rounded-4 my-5">
        <Card.Header className="fw-bold fs-5">Recent Activity</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item> New plant added — Aloe Vera</ListGroup.Item>
          <ListGroup.Item> Watering alert — Peace Lily</ListGroup.Item>
          <ListGroup.Item> Growth updated — Money Plant</ListGroup.Item>
        </ListGroup>
      </Card>

      {/* 🔹 QUICK LINKS */}
      <div className="card-grid my-5">
        <div className="card">
          <h3>My Plants</h3>
          <p>See all plants & add new ones.</p>
          <Link to="/plants" className="btn-primary">Open Plants</Link>
        </div>

        <div className="card">
          <h3>Tasks & Reminders</h3>
          <p>Manage watering & pruning schedules.</p>
        </div>

        <div className="card">
          <h3>AI Reports</h3>
          <p>Diagnose leaf issues instantly.</p>
        </div>

        {role === "ADMIN" && (
          <div className="card admin-card">
            <h3>Admin Panel</h3>
            <p>Manage system & users.</p>
            <Link to="/admin" className="btn-secondary">Open Admin Panel</Link>
          </div>
        )}
      </div>

      
    </div>
  );
}
