import { useState } from "react";
import api from "../api";
// import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";


import { User, Mail, Lock, ShoppingBag, Wrench, Home, Search, Hammer, Zap, Car, Package, Recycle, Heart, Phone, MapPin, Coffee, Scissors, PaintBucket, Laptop, Camera, Gift, Star, Shield, Truck, CreditCard, Clock, Globe, Lightbulb, Key, Coins, Handshake, Building, Briefcase, Gamepad2, Music, Book, Utensils, Shirt, Watch, Headphones, Bike, UserPlus, Users } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/register", { name, email, password, role });
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const handleLoginRedirect = () => {
    // alert("Redirecting to login page... (Demo mode)");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      {/* Animated floating background icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* First layer - more visible icons */}
        <div className="absolute animate-bounce" style={{top: '10%', left: '5%', animationDelay: '0s', animationDuration: '2s'}}>
          <ShoppingBag size={40} className="text-blue-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '15%', right: '10%', animationDelay: '0.5s', animationDuration: '1.5s'}}>
          <Wrench size={35} className="text-green-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '25%', left: '15%', animationDelay: '1s', animationDuration: '1.8s'}}>
          <Hammer size={30} className="text-orange-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '30%', right: '15%', animationDelay: '1.5s', animationDuration: '2.2s'}}>
          <Zap size={45} className="text-yellow-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '40%', left: '8%', animationDelay: '2s', animationDuration: '1.6s'}}>
          <Car size={38} className="text-red-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '45%', right: '5%', animationDelay: '2.5s', animationDuration: '1.9s'}}>
          <Package size={42} className="text-purple-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '60%', left: '12%', animationDelay: '3s', animationDuration: '2.1s'}}>
          <Recycle size={36} className="text-teal-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '65%', right: '20%', animationDelay: '3.5s', animationDuration: '1.7s'}}>
          <Heart size={32} className="text-pink-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '75%', left: '20%', animationDelay: '4s', animationDuration: '2.3s'}}>
          <Phone size={34} className="text-indigo-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '80%', right: '8%', animationDelay: '4.5s', animationDuration: '1.4s'}}>
          <MapPin size={40} className="text-emerald-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '85%', left: '25%', animationDelay: '5s', animationDuration: '2s'}}>
          <Coffee size={33} className="text-amber-300 opacity-50" />
        </div>
        
        {/* Second layer - mid-section icons */}
        <div className="absolute animate-pulse" style={{top: '5%', left: '30%', animationDelay: '0.2s', animationDuration: '1.8s'}}>
          <Scissors size={28} className="text-cyan-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '20%', right: '25%', animationDelay: '0.8s', animationDuration: '2.4s'}}>
          <PaintBucket size={37} className="text-violet-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '35%', left: '35%', animationDelay: '1.3s', animationDuration: '1.6s'}}>
          <Laptop size={41} className="text-slate-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '50%', right: '30%', animationDelay: '1.8s', animationDuration: '2.2s'}}>
          <Camera size={35} className="text-rose-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '70%', left: '40%', animationDelay: '2.3s', animationDuration: '1.5s'}}>
          <Gift size={39} className="text-fuchsia-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '90%', right: '35%', animationDelay: '2.8s', animationDuration: '2.1s'}}>
          <Star size={33} className="text-yellow-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '12%', left: '60%', animationDelay: '3.2s', animationDuration: '1.7s'}}>
          <Shield size={36} className="text-blue-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '28%', right: '45%', animationDelay: '3.7s', animationDuration: '1.9s'}}>
          <Home size={44} className="text-green-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '42%', left: '55%', animationDelay: '4.2s', animationDuration: '2.3s'}}>
          <Search size={31} className="text-orange-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '58%', right: '50%', animationDelay: '4.7s', animationDuration: '1.8s'}}>
          <Wrench size={38} className="text-purple-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '72%', left: '65%', animationDelay: '5.2s', animationDuration: '2s'}}>
          <ShoppingBag size={35} className="text-teal-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '88%', right: '60%', animationDelay: '5.7s', animationDuration: '1.6s'}}>
          <Hammer size={40} className="text-red-300 opacity-50" />
        </div>

        {/* Third layer - right section icons */}
        <div className="absolute animate-pulse" style={{top: '8%', left: '75%', animationDelay: '0.4s', animationDuration: '2.1s'}}>
          <Package size={29} className="text-indigo-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '22%', right: '65%', animationDelay: '1.1s', animationDuration: '1.7s'}}>
          <Coffee size={43} className="text-amber-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '38%', left: '70%', animationDelay: '1.6s', animationDuration: '2.4s'}}>
          <Phone size={32} className="text-emerald-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '52%', right: '70%', animationDelay: '2.1s', animationDuration: '1.5s'}}>
          <MapPin size={37} className="text-pink-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '68%', left: '78%', animationDelay: '2.6s', animationDuration: '1.8s'}}>
          <Scissors size={34} className="text-cyan-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '82%', right: '75%', animationDelay: '3.1s', animationDuration: '2.2s'}}>
          <Gift size={41} className="text-violet-300 opacity-50" />
        </div>

        {/* Fourth layer - additional marketplace icons */}
        <div className="absolute animate-pulse" style={{top: '3%', left: '45%', animationDelay: '0.3s', animationDuration: '1.9s'}}>
          <Truck size={33} className="text-blue-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '18%', left: '85%', animationDelay: '0.7s', animationDuration: '2.3s'}}>
          <CreditCard size={29} className="text-green-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '32%', right: '85%', animationDelay: '1.2s', animationDuration: '1.6s'}}>
          <Clock size={35} className="text-orange-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '47%', left: '90%', animationDelay: '1.7s', animationDuration: '2.1s'}}>
          <Globe size={38} className="text-purple-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '62%', right: '90%', animationDelay: '2.2s', animationDuration: '1.7s'}}>
          <Lightbulb size={31} className="text-yellow-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '77%', left: '85%', animationDelay: '2.7s', animationDuration: '1.9s'}}>
          <Key size={36} className="text-teal-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '92%', right: '85%', animationDelay: '3.2s', animationDuration: '2.2s'}}>
          <Coins size={34} className="text-amber-300 opacity-45" />
        </div>

        {/* Fifth layer - corner and edge icons */}
        <div className="absolute animate-bounce" style={{top: '6%', right: '3%', animationDelay: '0.6s', animationDuration: '1.8s'}}>
          <Handshake size={37} className="text-emerald-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '26%', left: '2%', animationDelay: '1.4s', animationDuration: '2s'}}>
          <Building size={39} className="text-slate-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '46%', right: '2%', animationDelay: '2.4s', animationDuration: '1.6s'}}>
          <Briefcase size={33} className="text-indigo-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '66%', left: '3%', animationDelay: '3.4s', animationDuration: '2.1s'}}>
          <Gamepad2 size={35} className="text-pink-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '86%', right: '3%', animationDelay: '4.4s', animationDuration: '1.7s'}}>
          <Music size={32} className="text-violet-300 opacity-50" />
        </div>

        {/* Sixth layer - fill remaining spaces */}
        <div className="absolute animate-pulse" style={{top: '14%', left: '50%', animationDelay: '0.9s', animationDuration: '2.2s'}}>
          <Book size={30} className="text-rose-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '36%', right: '55%', animationDelay: '1.5s', animationDuration: '1.8s'}}>
          <Utensils size={34} className="text-red-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '54%', left: '48%', animationDelay: '2.5s', animationDuration: '1.9s'}}>
          <Shirt size={32} className="text-cyan-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '74%', right: '52%', animationDelay: '3.5s', animationDuration: '2.1s'}}>
          <Watch size={36} className="text-blue-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '94%', left: '45%', animationDelay: '4.5s', animationDuration: '1.6s'}}>
          <Headphones size={33} className="text-purple-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '16%', right: '40%', animationDelay: '0.8s', animationDuration: '2.3s'}}>
          <Bike size={38} className="text-green-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '44%', left: '25%', animationDelay: '1.9s', animationDuration: '1.7s'}}>
          <Star size={29} className="text-yellow-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '64%', right: '25%', animationDelay: '2.9s', animationDuration: '2s'}}>
          <Shield size={35} className="text-teal-300 opacity-50" />
        </div>
        <div className="absolute animate-pulse" style={{top: '84%', left: '55%', animationDelay: '3.9s', animationDuration: '1.8s'}}>
          <Heart size={31} className="text-pink-300 opacity-45" />
        </div>
        <div className="absolute animate-bounce" style={{top: '2%', left: '65%', animationDelay: '4.9s', animationDuration: '2.2s'}}>
          <Zap size={37} className="text-yellow-300 opacity-50" />
        </div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Main register card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
          {/* Header section */}
          <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <UserPlus className="text-green-600" size={28} />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Join Us Today!</h1>
              <p className="text-blue-100">Create your marketplace account</p>
            </div>
            {/* Floating icons */}
            <div className="absolute top-4 left-4 text-white opacity-30">
              <Users size={20} />
            </div>
            <div className="absolute top-4 right-4 text-white opacity-30">
              <ShoppingBag size={20} />
            </div>
          </div>

          {/* Form section */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Name field */}
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200" size={20} />
                <input
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email field */}
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200" size={20} />
                <input
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password field */}
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200" size={20} />
                <input
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Role selection */}
              <div className="relative group">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200 z-10" size={20} />
                <select
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="" disabled className="text-gray-500">Select your role</option>
                  <option value="resident">🏠 Resident</option>
                  <option value="shopkeeper">🏪 Shopkeeper</option>
                  <option value="service provider">🔧 Service Provider</option>
                  <option value="homeowner">🏡 Home Owner</option>
                  <option value="admin">👑 Admin</option>
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Register button */}
              <button
                type="button"
                onClick={handleRegister}
                className="w-full py-3 rounded-xl font-semibold text-white text-lg transition-all duration-300 transform bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Create Account
              </button>

            </div>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-gray-500 text-sm">Already have an account?</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Sign in link */}
            <button 
              onClick={handleLoginRedirect}
              className="w-full py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              Sign In Instead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}