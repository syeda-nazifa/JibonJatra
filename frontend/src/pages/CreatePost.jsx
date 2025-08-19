// 
import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Pencil, Image, MapPin, Tag } from "lucide-react";

const CreatePost = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   navigate("/login"); // redirect immediately if not logged in
    // }
  }, [navigate]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "daily",
    location: "",
    images: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit clicked", form);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a post.");
      return;
    }

    try {
      await api.post(
        "/api/posts",
        {
          ...form,
          images:
            form.images && form.images.toLowerCase() !== "n/a"
              ? form.images.split(",").map((img) => img.trim())
              : [],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate("/posts");
    } catch (error) {
      console.error("Full error:", error);
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-12 opacity-20 animate-bounce">
          <Pencil size={40} className="text-purple-300" />
        </div>
        <div className="absolute top-1/4 right-16 opacity-20 animate-pulse">
          <Image size={50} className="text-pink-300" />
        </div>
        <div className="absolute top-1/2 left-20 opacity-20 animate-bounce">
          <MapPin size={35} className="text-green-300" />
        </div>
        <div className="absolute top-3/4 right-10 opacity-20 animate-pulse">
          <Tag size={40} className="text-blue-300" />
        </div>
      </div>

      {/* Main card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Create New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition"
            required
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Content"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition"
            rows="5"
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition"
          >
            <option value="daily">Daily</option>
            <option value="news">News</option>
            <option value="community">Community</option>
          </select>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition"
          />
          <input
            name="images"
            value={form.images}
            onChange={handleChange}
            placeholder="Image URLs (comma separated) or n/a"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
