import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const stored = localStorage.getItem("user");

  // If not logged in → go to login
  if (!stored) return <Navigate to="/login" replace />;

  const user = JSON.parse(stored);

  // If protected route requires a specific role (ADMIN or USER)
  if (role && user.role !== role) {
    // If unauthorized user tries to open admin panel → redirect
    if (user.role === "USER") return <Navigate to="/dashboard" replace />;
    if (user.role === "ADMIN") return <Navigate to="/admin" replace />;
  }

  return children;
}
