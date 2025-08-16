// import React, { useEffect, useState } from "react";
// import api from "../api";
// import { useNavigate, useParams } from "react-router-dom";

// const EditPost = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     title: "",
//     content: "",
//     category: "daily",
//     location: "",
//     images: "",
//   });

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const { data } = await api.get(`/posts/${id}`);
//         setForm({
//           title: data.title,
//           content: data.content,
//           category: data.category,
//           location: data.location || "",
//           images: data.images.join(","),
//         });
//       } catch (error) {
//         console.error("Error loading post:", error);
//       }
//     };
//     fetchPost();
//   }, [id]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       await api.put(`/posts/${id}`, {
//         ...form,
//         images: form.images ? form.images.split(",") : [],
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       navigate("/posts");
//     } catch (error) {
//       console.error("Error updating post:", error);
//     }
//   };
// return (
//     <div className="max-w-xl mx-auto mt-8">
//       <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           className="border p-2 w-full"
//           required
//         />
//         <textarea
//           name="content"
//           value={form.content}
//           onChange={handleChange}
//           className="border p-2 w-full"
//           rows="4"
//           required
//         />
//         <select
//           name="category"
//           value={form.category}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         >
//           <option value="daily">Daily</option>
//           <option value="news">News</option>
//           <option value="community">Community</option>
//         </select>
//         <input
//           name="location"
//           value={form.location}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />
//         <input
//           name="images"
//           value={form.images}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />
//         <button
//           type="submit"
//           className="bg-yellow-500 text-white px-4 py-2 rounded"
//         >
//           Update
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditPost;

import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, Image, MapPin, Tag } from "lucide-react";

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
      await api.put(
        `/posts/${id}`,
        {
          ...form,
          images: form.images ? form.images.split(",") : [],
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/posts");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-12 opacity-20 animate-bounce">
          <Pencil size={40} className="text-yellow-300" />
        </div>
        <div className="absolute top-1/4 right-16 opacity-20 animate-pulse">
          <Image size={50} className="text-orange-300" />
        </div>
        <div className="absolute top-1/2 left-20 opacity-20 animate-bounce">
          <MapPin size={35} className="text-green-300" />
        </div>
        <div className="absolute top-3/4 right-10 opacity-20 animate-pulse">
          <Tag size={40} className="text-pink-300" />
        </div>
      </div>

      {/* Main card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Edit Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none transition"
            required
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Content"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none transition"
            rows="5"
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none transition"
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
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none transition"
          />
          <input
            name="images"
            value={form.images}
            onChange={handleChange}
            placeholder="Image URLs (comma separated) or n/a"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none transition"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
