PlantCare

PlantCare is a full-stack web application built with React and Spring Boot that allows users to upload plant images and receive simple care suggestions using the Gemini API. The app provides features for managing plants and ensures secure authentication using JWT.

Features

Upload plant images and generate care suggestions via Gemini API

Add, view, and delete plant entries

Secure login and authentication with JWT

Clean and responsive frontend built with React

RESTful backend built using Spring Boot and MySQL

Tech Stack

Frontend: React, Axios
Backend: Spring Boot, Spring Security (JWT), Hibernate/JPA
Database: MySQL
API Integration: Gemini API

How It Works

User uploads a plant image

The image is processed and sent to the Gemini API

The API returns plant care suggestions

Suggestions are displayed in the UI and can be saved along with plant data

Project Structure

Frontend:
/src/components – React components
/api – API calls
/pages – UI pages

Backend:
/controllers – REST controllers
/services – Business logic
/repositories – JPA repositories
/entities – Database models
/config – Security and JWT configuration

Installation
Backend
cd backend
mvn clean install
mvn spring-boot:run

Frontend
cd frontend
npm install
npm start
