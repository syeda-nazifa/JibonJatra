import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

// Pages
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import AdminUserManagement from "./pages/AdminUserManagement";
import AdminRoleUpdate from "./pages/AdminRoleUpdate";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Announcements from "./pages/Announcements";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import ServiceList from "./pages/ServiceList";
import ServiceCreate from "./pages/ServiceCreate";
import ServiceEdit from "./pages/ServiceEdit";
import Products from "./pages/Products";
import ProductNew from "./pages/ProductNew";
import ProductEdit from "./pages/ProductEdit";
import Shop from "./pages/Shop"; // <-- Shop page

// Protected Route Component
const ProtectedRoute = ({ children, user, adminOnly = false }) => {
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/posts" replace />;
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) return <div>Loading...</div>;

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
          <Route index element={<Navigate to="/posts" replace />} />

          {/* Main Routes */}
          <Route path="posts" element={<Posts />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="edit/:id" element={<EditPost />} />
          <Route path="profile" element={<Profile user={user} setUser={setUser} />} />
          <Route path="profile/edit" element={<ProfileEdit setUser={setUser} />} />
          <Route path="announcements" element={<Announcements />} />

          {/* Services */}
          <Route path="services" element={<ServiceList token={user?.token} user={user} />} />
          <Route path="services/create" element={<ServiceCreate token={user?.token} user={user} />} />
          <Route path="services/edit/:id" element={<ServiceEdit token={user?.token} user={user} />} />

          {/* Admin Routes */}
          <Route path="admin/users" element={<ProtectedRoute user={user} adminOnly><AdminUserManagement /></ProtectedRoute>} />
          <Route path="admin/roles" element={<ProtectedRoute user={user} adminOnly><AdminRoleUpdate /></ProtectedRoute>} />
          <Route path="admin/announcements" element={<ProtectedRoute user={user} adminOnly><AdminAnnouncements /></ProtectedRoute>} />

          {/* Products */}
          <Route path="products" element={<Products />} />
          <Route path="products/new" element={<ProductNew />} />
          <Route path="products/:id/edit" element={<ProductEdit />} />

          {/* Shop */}
          <Route path="shop" element={<Shop user={user} />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
