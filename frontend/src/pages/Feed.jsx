import React, { useState, useEffect } from "react";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";

export default function Feed() {
  const [token, setToken] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token"); // get token from localStorage
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const containerStyle = {
    maxWidth: "720px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  };

  const headerStyle = {
    textAlign: "center",
    color: "#333",
    marginBottom: "30px",
    fontWeight: "700",
    fontSize: "2.2rem",
    letterSpacing: "1.5px",
  };

  const messageStyle = {
    textAlign: "center",
    fontSize: "1.1rem",
    color: "#555",
    marginTop: "50px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Community Feed</h1>

      {token ? (
        <>
          <CreatePost
            token={token}
            onPostCreated={() => setRefresh(!refresh)}
          />
          <PostList key={refresh} />
        </>
      ) : (
        <p style={messageStyle}>
          Please <strong>log in</strong> to create and view posts.
        </p>
      )}
    </div>
  );
}

