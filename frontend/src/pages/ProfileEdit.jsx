import { useEffect, useState } from "react";
import api from "../api";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import ProfileViewUpdate from '../components/ProfileViewUpdate.jsx';

export default function ProfileEdit() {
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
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Profile</h1>
      <ProfileViewUpdate user={user} onUpdate={(updatedUser) => setUser(updatedUser)} />
      <button
        className="mt-4 w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        onClick={() => navigate("/profile")}
      >
        Back to Profile
      </button>
    </Layout>
  );
}
