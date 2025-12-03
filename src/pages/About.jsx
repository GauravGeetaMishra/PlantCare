import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function About() {
  const teamMembers = [
    {
      name: "Akshay Balte",
      prn: "250840320017",
      image: "/src/assets/images/Akshay.jpg",
    },
    {
      name: "Gaurav Mishra",
      prn: "250840320067",
      image: "/src/assets/images/Gaurav.jpg",
    },
    {
      name: "Sakshi Baitule",
      prn: "250840320164",
      image: "/src/assets/images/Sakshi.jpg",
    },
    
  ];

  return (
  <Container style={{ padding: "40px", fontFamily: "Verdana, sans-serif" }}>
    <h1 className="text-center text-success mb-4">About Us</h1>

    <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
      <strong>Plant Care Planner</strong> is a smart, user-friendly platform designed
      to help plant lovers track, organize, and manage all their plant care needs.
      Whether you're a beginner or a seasoned plant enthusiast, our system ensures
      your plants stay healthy and well-maintained.
    </p>

    <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
      Users can register, log in, view their personalized dashboard (including total
      plants and total tasks), and perform complete plant management — add, update,
      delete plants, and assign tasks to each plant. Task reports can also be sent
      via email for easy tracking and reminders.
    </p>

    <h2 className="text-success mt-5">Our Vision</h2>
    <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
      To encourage a greener lifestyle by providing a digital space that helps users
      care for their plants effortlessly and consistently, fostering a deeper
      connection with nature.
    </p>

    <h2 className="text-success mt-5">Our Mission</h2>
    <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
      To build a reliable and accessible platform where plant care becomes simpler,
      organized, and more enjoyable using modern technology and intelligent tools.
    </p>

    <h2 className="text-success mt-5">Admin Features</h2>
    <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
      Our system includes a dedicated admin panel where administrators can view all
      registered users and monitor platform activity. Enhanced security is provided
      through OTP-based 2-step verification during login.
    </p>

    <h2 className="text-success mt-5 text-center mb-4">Our Team</h2>
    <Row className="justify-content-center g-4">
      {teamMembers.map((member, index) => (
        <Col key={index} xs={12} sm={6} md={4}>
          <Card className="text-center shadow-sm">
            <Card.Img
              variant="top"
              src={member.image}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                margin: "20px auto 10px",
              }}
            />
            <Card.Body>
              <Card.Title className="text-success">{member.name}</Card.Title>
              <Card.Text style={{ fontSize: "16px", color: "#555" }}>
                PRN: {member.prn}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

}
