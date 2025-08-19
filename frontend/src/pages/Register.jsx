import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { 
  User, Mail, Lock, Users, UserPlus,
  ShoppingBag, Wrench, Hammer, Zap, Car, Package, Recycle, Heart, Phone, MapPin,
  Coffee, Scissors, PaintBucket, Laptop, Camera, Gift, Star, Shield, Truck, CreditCard,
  Clock, Globe, Lightbulb, Key, Coins, Handshake, Building, Briefcase, Gamepad2,
  Music, Book, Utensils, Shirt, Watch, Headphones, Bike
} from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/register", { name, email, password, phone, address, role });
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const handleLoginRedirect = () => navigate("/");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      {/* Floating icons omitted for brevity, keep your current code */}

      <div className="w-full max-w-md relative">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
          <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <UserPlus className="text-green-600" size={28} />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Join Us Today!</h1>
              <p className="text-blue-100">Create your marketplace account</p>
            </div>
          </div>

          <form onSubmit={handleRegister} className="p-8 space-y-6">
            <div className="relative group">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200" size={20} />
              <input type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white"/>
            </div>

            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200" size={20} />
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white"/>
            </div>

            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200" size={20} />
              <input type="password" placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white"/>
            </div>

            <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white"/>
            <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}
              className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white"/>

            <div className="relative group">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200 z-10" size={20} />
              <select value={role} onChange={(e) => setRole(e.target.value)} required
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer">
                <option value="" disabled>Select your role</option>
                <option value="resident">🏠 Resident</option>
                <option value="shopkeeper">🏪 Shopkeeper</option>
                <option value="service provider">🔧 Service Provider</option>
                <option value="homeowner">🏡 Home Owner</option>
                <option value="admin">👑 Admin</option>
              </select>
            </div>

            <button type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white text-lg transition-all duration-300 transform bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hover:scale-105 hover:shadow-lg active:scale-95">
              Create Account
            </button>

            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-gray-500 text-sm">Already have an account?</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <button type="button" onClick={handleLoginRedirect}
              className="w-full py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
              Sign In Instead
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
