import { useState } from "react";
import api from "../api";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import cartoonAnimation from "../assets/cartoon.json"; // animation file

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      {/* Cartoon animated background */}
      <Lottie
        animationData={cartoonAnimation}
        loop={true}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Overlay to make form readable */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Login form */}
      <div className="relative z-20 bg-white p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
