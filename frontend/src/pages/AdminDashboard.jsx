// import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  Users, 
  Megaphone, 
  Star, 
  BarChart3, 
  Settings, 
  Shield,
  FileText,
  Calendar,
  CreditCard,
  LogOut
} from "lucide-react";

const AdminDashboard = ({ role, onLogout }) => {
  const navigate = useNavigate();
//   const [activeSection, setActiveSection] = useState("dashboard");

  // Admin management cards
  const ADMIN_CARDS = [
    {
      title: "User Management",
      description: "Manage user accounts, roles, and permissions",
      icon: <Users className="w-8 h-8" />,
      path: "/admin/users",
      color: "bg-blue-500"
    },
    {
      title: "Announcement Management",
      description: "Create and manage community announcements",
      icon: <Megaphone className="w-8 h-8" />,
      path: "/admin/announcements",
      color: "bg-green-500"
    },
    {
      title: "Sponsored Posts",
      description: "Manage sponsored content and promotions",
      icon: <Star className="w-8 h-8" />,
      path: "/admin/sponsored-posts",
      color: "bg-amber-500"
    },
    {
      title: "Analytics & Reports",
      description: "View platform analytics and generate reports",
      icon: <BarChart3 className="w-8 h-8" />,
      path: "/admin/analytics",
      color: "bg-purple-500"
    },
    {
      title: "Content Moderation",
      description: "Moderate user-generated content",
      icon: <Shield className="w-8 h-8" />,
      path: "/admin/moderation",
      color: "bg-red-500"
    },
    {
      title: "System Settings",
      description: "Configure platform settings and preferences",
      icon: <Settings className="w-8 h-8" />,
      path: "/admin/settings",
      color: "bg-gray-500"
    }
  ];

  // Navigation links (extracted from your navbar)
  const NAV_LINKS = [
    { to: "/feed", label: "Feed", icon: <FileText className="w-5 h-5" /> },
    { to: "/posts", label: "Posts", icon: <FileText className="w-5 h-5" /> },
    { to: "/market", label: "Market", icon: <CreditCard className="w-5 h-5" /> },
    { to: "/shop", label: "Shop", icon: <CreditCard className="w-5 h-5" /> },
    { to: "/services", label: "Service", icon: <Settings className="w-5 h-5" /> },
    { to: "/lostfound", label: "Lost & Found", icon: <Shield className="w-5 h-5" /> },
    { to: "/home-rent", label: "Home Rent", icon: <Calendar className="w-5 h-5" /> },
    { to: "/profile", label: "Profile", icon: <Users className="w-5 h-5" /> },
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome, Admin</h2>
          <p className="text-gray-600">Manage your platform efficiently with the tools below</p>
        </div>

        {/* Admin Management Cards */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Administration Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADMIN_CARDS.map((card, index) => (
              <div 
                key={index}
                onClick={() => handleCardClick(card.path)}
                className="bg-white rounded-xl shadow-md p-6 cursor-pointer transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${card.color} text-white`}>
                    {card.icon}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h4>
                <p className="text-gray-600 text-sm">{card.description}</p>
                <div className="mt-4 text-blue-600 font-medium text-sm">
                  Manage →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Quick Navigation
          </h3>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {NAV_LINKS.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex flex-col items-center p-4 rounded-lg transition-colors duration-200 ${
                      isActive 
                        ? "bg-blue-100 text-blue-700" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`
                  }
                >
                  <div className="mb-2">{link.icon}</div>
                  <span className="text-sm font-medium">{link.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Overview (optional) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-4">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">1,248</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg text-green-600 mr-4">
                <Megaphone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Announcements</p>
                <p className="text-2xl font-bold text-gray-800">42</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600 mr-4">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Sponsored Posts</p>
                <p className="text-2xl font-bold text-gray-800">18</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600 mr-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Reports Today</p>
                <p className="text-2xl font-bold text-gray-800">7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;