import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "../Styles/home.css";
import { Card, Row, Col } from "react-bootstrap";

export default function Home() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  //  Define cards here, before return
  const cards = [
    {
      img: "/imgcard.jpg",
      title: "Plant Care Essentials",
      desc: "Tips to keep leaves green.",
    },
    {
      img: "/imgcard2.jpg",
      title: "Watering Tips",
      desc: "How to water plants properly.",
    },
    {
      img: "/imgcard3.jpg",
      title: "Soil & Fertilizer",
      desc: "Best soil and nutrients for growth.",
    },
  ];

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>PlantCare Planner</h1>
          <p>
            Your personalized digital assistant to nurture, grow and protect
            every plant in your space.
          </p>
          {!user ? (
            <div className="hero-actions">
              <Link to="/login" className="btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn-secondary">
                Create Account
              </Link>
            </div>
          ) : user?.role === "ADMIN" ? null : (
            <div className="hero-actions">
              <Link to="/dashboard" className="btn-primary">
                Go to Dashboard
              </Link>
              <Link to="/plants" className="btn-secondary">
                View My Plants
              </Link>
            </div>
          )}

          <div className="hero-stats">
            <div>
              <h3>100+</h3>
              <p>Cared Plants</p>
            </div>
            <div>
              <h3>Daily</h3>
              <p>Care Reminders</p>
            </div>
            <div>
              <h3>One App</h3>
              <p>Full Plant Management</p>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img src="/plantcareHome.jpg" alt="Healthy plant" />
        </div>
      </section>

      {/* FIRST CAROUSEL */}
      <Carousel fade interval={3000}>
        <Carousel.Item>
          <img className="d-block w-100" src="/slide1.jpg" alt="First slide" />
          <Carousel.Caption>
            <h3>Every Plant Matters</h3>
            <p>
              Give each plant the attention it deserves with personalized
              schedules.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src="/slide2.jpg" alt="Second slide" />
          <Carousel.Caption>
            <h3>Never Miss a Watering</h3>
            <p>Smart reminders keep your plants hydrated at the right time.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src="/slide3.jpg" alt="Third slide" />
          <Carousel.Caption>
            <h3>Grow Confidently</h3>
            <p>Track progress and understand your plants better every day.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* CARD SECTION */}
      <Row className="g-4 my-5">
        {cards.map((card, i) => (
          <Col md={4} key={i}>
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden card-hover">
              <Card.Img
                variant="top"
                src={card.img}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Body className="text-center">
                <h4 className="fw-bold mb-2">{card.title}</h4>
                <p>{card.desc}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* SECOND CAROUSEL */}
      <Carousel fade interval={2800} className="my-5">
        {[1, 2, 3].map((i) => (
          <Carousel.Item key={i}>
            <div
              className="d-flex flex-column align-items-center text-center"
              style={{ padding: "90px 0", background: "#e7ffe7" }}
            >
              <img
                src="/slide1.jpg"
                alt=""
                style={{
                  height: "180px",
                  width: "180px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <h3 className="mt-4 fw-bold">“Healthy Plants • Happy Home”</h3>
              <p className="w-75 mt-2 fs-5">
                Caring for plants creates peace, positivity and a relaxing
                environment around you.
              </p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
