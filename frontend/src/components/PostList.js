import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api/posts";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts()
      .then(data => setPosts(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Community Feed</h2>
      {posts.length === 0 && <p>No posts found.</p>}
      {posts.map(post => (
        <div key={post._id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>Category: {post.category}</small><br />
          <small>Location: {post.location}</small><br />
          {post.images?.map((img, idx) => (
            <img key={idx} src={img} alt="Post" style={{ maxWidth: "200px", marginTop: "5px" }} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PostList;
