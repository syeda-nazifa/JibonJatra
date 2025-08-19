import React, { useState } from "react";
import { createPost } from "../api/posts";

const CreatePost = ({ token, onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("daily");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        title,
        content,
        category,
        location,
        images: images ? images.split(",").map(i => i.trim()) : []
      };
      const newPost = await createPost(postData, token);
      alert("Post created successfully!");
      onPostCreated(newPost);
      setTitle("");
      setContent("");
      setLocation("");
      setImages("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Create a New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ display: "block", marginBottom: "10px" }}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        style={{ display: "block", marginBottom: "10px" }}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ marginBottom: "10px" }}>
        <option value="daily">Daily</option>
        <option value="news">News</option>
        <option value="community">Community</option>
      </select>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />
      <input
        type="text"
        placeholder="Image URLs (comma separated)"
        value={images}
        onChange={(e) => setImages(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
