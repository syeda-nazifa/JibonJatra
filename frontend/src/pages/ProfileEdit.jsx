// import { useEffect, useState } from "react";
// import api from "../api";
// import Layout from "../components/Layout";
// import { useNavigate } from "react-router-dom";
// import ProfileViewUpdate from '../components/ProfileViewUpdate.jsx';

// export default function ProfileEdit() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await api.get("/api/profile");
//         setUser(res.data);
//       } catch {
//         navigate("/");
//       }
//     };
//     fetchProfile();
//   }, [navigate]);

//   if (!user) return null;

//   return (
//     <Layout>
//       <h1 className="text-2xl font-bold mb-4 text-center">Edit Profile</h1>
//       <ProfileViewUpdate user={user} onUpdate={(updatedUser) => setUser(updatedUser)} />
//       <button
//         className="mt-4 w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
//         onClick={() => navigate("/profile")}
//       >
//         Back to Profile
//       </button>
//     </Layout>
//   );
// }


import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import ProfileViewUpdate from "../components/ProfileViewUpdate.jsx";
import { User, Shield, Wrench, Heart, Laptop, ShoppingBag, Home } from "lucide-react";

export default function ProfileEdit() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/profile");
        setUser(res.data);
      } catch {
        navigate("/");
      }
    };
    fetchProfile();
  }, [navigate]);

  if (!user) return <p className="p-4 text-center text-gray-600">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Floating background icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute animate-bounce top-10 left-12 opacity-20">
          <User size={40} className="text-blue-300" />
        </div>
        <div className="absolute animate-pulse top-1/4 right-16 opacity-20">
          <Shield size={50} className="text-green-300" />
        </div>
        <div className="absolute animate-bounce top-1/2 left-20 opacity-20">
          <Wrench size={35} className="text-yellow-300" />
        </div>
        <div className="absolute animate-pulse top-3/4 right-10 opacity-20">
          <Heart size={40} className="text-purple-300" />
        </div>
        <div className="absolute animate-bounce top-3/5 left-1/2 opacity-20">
          <Laptop size={35} className="text-pink-300" />
        </div>
        <div className="absolute animate-pulse top-2/5 right-1/4 opacity-20">
          <ShoppingBag size={40} className="text-teal-300" />
        </div>
        <div className="absolute animate-bounce top-1/6 left-3/4 opacity-20">
          <Home size={35} className="text-orange-300" />
        </div>
      </div>

      {/* Main card */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-8 text-center relative">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <User className="text-green-600" size={28} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Edit Your Profile</h1>
            <p className="text-blue-100">Update your account details</p>
          </div>
        </div>

        {/* Form / Profile update */}
        <div className="p-8">
          <ProfileViewUpdate user={user} onUpdate={(updatedUser) => setUser(updatedUser)} />
          
          {/* Back button */}
          <button
            onClick={() => navigate("/profile")}
            className="mt-6 w-full py-3 rounded-xl font-semibold text-white text-lg transition-all duration-300 transform bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 hover:scale-105"
          >
            Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
}
