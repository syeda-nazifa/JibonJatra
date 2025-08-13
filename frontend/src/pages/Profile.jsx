import { useEffect, useState } from "react";
import api from "../api";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/profile");
        setUser(res.data);
      } catch {
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  if (!user) return null;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <button
        className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        onClick={() => navigate("/profileEdit")}
      >
        Edit Profile
      </button>

      <button
        className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </button>
    </Layout>
  );
}
