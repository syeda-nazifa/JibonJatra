import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

import LostFound from "./LostFound"; // adjust path if App.jsx is in src/



import AdminRoleUpdate from "./pages/AdminRoleUpdate";
import AdminUserManagement from "./pages/AdminUserManagement";

import ProfileEdit from "./pages/ProfileEdit";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

       
        <Route path="/profile" element={<Profile />} />
         <Route path="/feed" element={<Feed />} /> 
         <Route path="/posts" element={<Posts />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />


        <Route path="/admin/role-update" element={<AdminRoleUpdate />} />
        <Route path="/admin/users" element={<AdminUserManagement />} />

        <Route path="/profileEdit" element={<ProfileEdit />} />
        <Route path="/lostfound" element={<LostFound />} />

      </Routes>
    </Router>
  );
}
