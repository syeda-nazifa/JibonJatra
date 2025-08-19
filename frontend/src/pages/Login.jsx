import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { 
  User, Mail, Lock, ShoppingBag, Wrench, Home, Search, Hammer, Zap, Car, Package, Recycle, Heart, Phone, MapPin, Coffee, Scissors, PaintBucket, Laptop, Camera, Gift, Star, Shield, Truck, CreditCard, Clock, Globe, Lightbulb, Key, Coins, Handshake, Building, Briefcase, Gamepad2, Music, Book, Utensils, Shirt, Watch, Headphones, Bike 
} from "lucide-react";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Check for saved user and redirect
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userObj = JSON.parse(savedUser);
      navigate(userObj.role === "admin" ? "/admin/users" : "/profile");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      // Decode JWT
      const payload = JSON.parse(atob(res.data.token.split(".")[1]));
      const loggedInUser = { email: payload.email, role: payload.role, id: payload.id };

      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setUser(loggedInUser);

      navigate(loggedInUser.role === "admin" ? "/admin/users" : "/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4 relative">
      {/* Background floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Example icons - first few layers shown for brevity */}
        <ShoppingBag size={40} className="absolute top-[10%] left-[5%] text-blue-300 opacity-50 animate-bounce" />
        <Wrench size={35} className="absolute top-[15%] right-[10%] text-green-300 opacity-45 animate-pulse" />
        <Hammer size={30} className="absolute top-[25%] left-[15%] text-orange-300 opacity-50 animate-bounce" />
        <Zap size={45} className="absolute top-[30%] right-[15%] text-yellow-300 opacity-45 animate-pulse" />
        {/* Continue adding the rest of your icons similarly */}
      </div>

      {/* Login card */}
      <div className="w-full max-w-md relative">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <User className="text-blue-600" size={28} />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
              <p className="text-blue-100">Your daily marketplace awaits</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" size={20} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" size={20} />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-white text-lg transition-all duration-300 transform bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Sign In
              </button>

              <div className="text-center">
                <a href="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors duration-200">
                  Forgot your password?
                </a>
              </div>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-gray-500 text-sm">New here?</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <button
              onClick={() => navigate("/register")}
              className="w-full py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
