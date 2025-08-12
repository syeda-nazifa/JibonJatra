import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AdminRoleUpdate from "./pages/AdminRoleUpdate";
import AdminUserManagement from "./pages/AdminUserManagement";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/role-update" element={<AdminRoleUpdate />} />
        <Route path="/admin/users" element={<AdminUserManagement />} />
      </Routes>
    </Router>
  );
}
