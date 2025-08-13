import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
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

      // Redirect after successful creation
      navigate("/posts");
    } catch (error) {
  console.error("Full error:", error);
  alert(error.response?.data?.message || error.message);
}
  };
  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          className="border p-2 w-full"
          rows="4"
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 w-full"
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
          className="border p-2 w-full"
        />
        <input
          name="images"
          value={form.images}
          onChange={handleChange}
          placeholder="Image URLs (comma separated) or n/a"
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePost;


  