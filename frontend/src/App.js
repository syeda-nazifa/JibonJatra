// App.js - Corrected routing structure
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

// Pages
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";


import LostFound from "./LostFound"; // adjust path if App.jsx is in src/



// import AdminRoleUpdate from "./pages/AdminRoleUpdate";
// import AdminUserManagement from "./pages/AdminUserManagement"


import Profile from "./pages/Profile";

import ProfileEdit from "./pages/ProfileEdit";
import AdminUserManagement from "./pages/AdminUserManagement";
import AdminRoleUpdate from "./pages/AdminRoleUpdate";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Announcements from "./pages/Announcements";
import AdminAnnouncements from "./pages/AdminAnnouncements";

// Protected Route Component
const ProtectedRoute = ({ children, user, adminOnly = false }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/posts" replace />;
  }

  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("App mounted, checking localStorage...");
    const savedUser = localStorage.getItem("user");
    console.log("savedUser from localStorage:", savedUser);

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log("Parsed user:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Watch for user state changes
  useEffect(() => {
    console.log("User state changed:", user);
  }, [user]);

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("App rendering with user:", user);

  return (
    <Router>
  <Routes>
    {/* Public Routes */}
    <Route path="/login" element={<Login setUser={setUser} />} />
    <Route path="/register" element={<Register />} />

    {/* Protected Routes inside Layout */}
    <Route
      path="/"
      element={
        <ProtectedRoute user={user}>
          <Layout user={user} setUser={setUser} onLogout={handleLogout} />
        </ProtectedRoute>
      }
    >
      {/* Default redirect */}
      <Route index element={<Navigate to="/posts" replace />} />

      {/* Main Routes */}
      <Route path="posts" element={<Posts />} />
      <Route path="create-post" element={<CreatePost />} />
      <Route path="edit/:id" element={<EditPost />} />
      <Route path="profile" element={<Profile user={user} setUser={setUser} />} />
      <Route path="profile/edit" element={<ProfileEdit setUser={setUser} />} />

      {/* Announcements */}
      <Route path="announcements" element={<Announcements />} />


        <Route path="/profileEdit" element={<ProfileEdit />} />
        <Route path="/lostfound" element={<LostFound />} />

      {/* Admin Routes */}
      <Route
        path="admin/users"
        element={
          <ProtectedRoute user={user} adminOnly={true}>
            <AdminUserManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin/roles"
        element={
          <ProtectedRoute user={user} adminOnly={true}>
            <AdminRoleUpdate />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin/announcements"
        element={
          <ProtectedRoute user={user} adminOnly={true}>
            <AdminAnnouncements />
          </ProtectedRoute>
        }
      />
    </Route>

    {/* Catch all */}
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
</Router>

  );
}

export default App;