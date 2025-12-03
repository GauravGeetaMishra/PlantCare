import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OTPVerify from "./pages/OTPVerify";

// User Pages
import Dashboard from "./pages/Dashboard";
import Plants from "./pages/Plants";
import PlantDetails from "./pages/PlantDetails";
import PlantEdit from "./pages/PlantEdit";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Ask from "./pages/Ask";
import "./styles.css";
// Admin Page

import AdminUsers from "./pages/AdminUsers";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<OTPVerify />} />
         <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* USER Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="USER">
              <Dashboard />
            </ProtectedRoute>
          }
        />
       
        <Route
          path="/plants"
          element={
            <ProtectedRoute role="USER">
              <Plants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plants/:id"
          element={
            <ProtectedRoute role="USER">
              <PlantDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Ask"
          element={
            <ProtectedRoute role="USER">
              <Ask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plants/edit/:id"
          element={
            <ProtectedRoute role="USER">
              <PlantEdit />
            </ProtectedRoute>
          }
        />

        {/* ADMIN Protected Route */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminUsers />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}
