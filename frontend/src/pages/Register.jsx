import { useState } from "react";
import api from "../api";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/register", { name, email, password, role });
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input className="w-full border p-2 rounded" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="w-full border p-2 rounded" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full border p-2 rounded" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <select
          className="w-full border p-2 rounded"
          value={role}
          onChange={e => setRole(e.target.value)}
          required
        >
          <option value="" disabled>Select role</option>
          <option value="resident">Resident</option>
          <option value="shopkeeper">Shopkeeper</option>
          <option value="service provider">Service Provider</option>
          <option value="homeowner">Home Owner</option>
          <option value="admin">Admin</option>
        </select>
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Register</button>
      </form>
    </Layout>
  );
}
