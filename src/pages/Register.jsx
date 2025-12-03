import { useState } from "react";
import { registerUser } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [data, set] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await registerUser(data);
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create your account </h2>
        <p className="auth-subtitle">It only takes a moment.</p>

        <form onSubmit={submit}>
          <label>Name</label>
          <input
            type="text"
            required
            placeholder="Akshay"
            onChange={(e) => set({ ...data, name: e.target.value })}
          />

          <label>Email</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            onChange={(e) => set({ ...data, email: e.target.value })}
          />

          <label>Password</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            onChange={(e) => set({ ...data, password: e.target.value })}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
