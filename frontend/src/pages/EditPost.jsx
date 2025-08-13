import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "daily",
    location: "",
    images: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);
        setForm({
          title: data.title,
          content: data.content,
          category: data.category,
          location: data.location || "",
          images: data.images.join(","),
        });
      } catch (error) {
        console.error("Error loading post:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.put(`/posts/${id}`, {
        ...form,
        images: form.images ? form.images.split(",") : [],
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/posts");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
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
          className="border p-2 w-full"
        />
        <input
          name="images"
          value={form.images}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPost;