import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get("/api/posts");
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link to="/create-post" className="bg-blue-500 text-white px-4 py-2 rounded">
          New Post
        </Link>
      </div>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="border p-4 rounded mb-4 shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>
            <p className="text-sm text-gray-500">
              Category: {post.category} | Location: {post.location || "N/A"}
            </p>
            <Link to={`/posts/${post._id}`} className="text-blue-500 mt-2 block">
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Posts;