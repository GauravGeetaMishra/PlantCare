import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const role = user?.role;

  // Auto update navbar when login/logout happens
  useEffect(() => {
    const listener = () => {
      const saved = localStorage.getItem("user");
      setUser(saved ? JSON.parse(saved) : null);
    };

    window.addEventListener("userUpdated", listener);
    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener("userUpdated", listener);
      window.removeEventListener("storage", listener);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userUpdated"));
    navigate("/login");
  };

  return (
    <header className="navBar">
      <div className="logo">PlantCare</div>

      <nav className={menuOpen ? "nav-links active" : "nav-links"}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/contact">Contact Us</NavLink>

        {!user && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register" className="btn-link">Signup</NavLink>
          </>
        )}

        {user && role === "USER" && (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/plants">My Plants</NavLink>
            <NavLink to="/Ask">Ask Gemini</NavLink>
          </>
        )}

        {user && role === "ADMIN" && (
          <NavLink to="/admin/users" style={{ fontWeight: "bold" }}>
            Admin Panel
          </NavLink>
        )}

        {user && (
          <button onClick={logout} className="nav-btn">
            Logout
          </button>
        )}
      </nav>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
