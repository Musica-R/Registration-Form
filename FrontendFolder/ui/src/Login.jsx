import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [forms, setForms] = useState({ email: "", password: "" });
  const [otpForm, setOtpForm] = useState({ userId: "", otp: "" });
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => setForms({ ...forms, [e.target.name]: e.target.value });
  const handleOtpChange = (e) => setOtpForm({ ...otpForm, [e.target.name]: e.target.value });


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(forms),
      });
      const data = await res.json();
      alert(data.message);
      if (res.ok) {
        setOtpForm({ ...otpForm, userId: data.userId });
        setStep(2);
      }
    } catch (err) {
      alert("Login failed");
    }
  };


  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/user/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(otpForm),
      });
      const data = await res.json();
      alert(data.message);
      if (res.ok) {
        localStorage.setItem("userName", data.Name);
        localStorage.setItem("token", data.token);
        navigate("https://project-youtubeclone-123.netlify.app");
      }
    } catch (err) {
      alert("OTP verification failed");
    }
  };

  return (
    <div className="form-container">
      {step === 1 && (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} value={forms.email} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} value={forms.password} required />
          <button type="submit">Send OTP</button>
          <p onClick={() => navigate("/forgot-password")} style={{ cursor: "pointer" }}>Forgot Password?</p>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <h2>Enter OTP</h2>
          <input type="text" name="otp" placeholder="OTP" onChange={handleOtpChange} value={otpForm.otp} required />
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
}
