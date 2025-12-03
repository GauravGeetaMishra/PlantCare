import { useState } from "react";
import { verifyOtp } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function OTPVerify() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const tempUser = JSON.parse(localStorage.getItem("tempUser") || "null");

  const submit = async (e) => {
    e.preventDefault();
    if (!tempUser) {
      alert("No pending login. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const res = await verifyOtp({ userId: tempUser.id, otp: Number(otp) });

      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.removeItem("tempUser");

      // ⭐⭐ THIS FIXES YOUR NAVBAR ISSUE ⭐⭐
      window.dispatchEvent(new Event("userUpdated"));

      alert("OTP verified! Welcome.");
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Verify OTP </h2>
        <p className="auth-subtitle">
          We’ve sent a 6-digit code to your email.
        </p>
        <form onSubmit={submit}>
          <label>OTP</label>
          <input
            type="number"
            required
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button type="submit">Verify</button>
        </form>
      </div>
    </div>
  );
}
