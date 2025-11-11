import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { authContext } from "../context/AuthContext.jsx";
import { FaUserShield, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaHome } from "react-icons/fa";

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/admin-login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.message);
      }

      // Check if user is actually an admin
      if (result.role !== 'admin') {
        throw new Error('Unauthorized: Admin access only');
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });

      setLoading(false);
      toast.success("Admin login successful!");
      navigate("/admin/home");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-primaryColor via-blue-800 to-purple-900 flex items-center justify-center px-5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="w-full max-w-[500px] mx-auto relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10 transform hover:scale-105 transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primaryColor to-blue-600 rounded-full mb-6 shadow-lg">
              <FaUserShield className="text-white text-3xl" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Admin Portal
            </h1>
            <p className="text-blue-200 text-base font-medium">
              Secure access for administrators only
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primaryColor to-blue-400 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={submitHandler} className="space-y-7">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <FaEnvelope className="text-blue-300 group-focus-within:text-white transition-colors duration-200" />
              </div>
              <input
                type="email"
                placeholder="Admin Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-transparent text-white placeholder-blue-200 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/15"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <FaLock className="text-blue-300 group-focus-within:text-white transition-colors duration-200" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Admin Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-transparent text-white placeholder-blue-200 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/15"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-4 flex items-center z-10"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-blue-300 hover:text-white transition-colors duration-200" />
                ) : (
                  <FaEye className="text-blue-300 hover:text-white transition-colors duration-200" />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primaryColor to-blue-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <HashLoader size={20} color="#ffffff" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <FaUserShield />
                  <span>Access Admin Panel</span>
                </div>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-blue-200 text-sm">
              Not an admin?{" "}
              <Link 
                to="/login" 
                className="text-white hover:text-blue-300 font-semibold transition duration-200 underline underline-offset-2"
              >
                User Login
              </Link>
            </p>
            
            <Link 
              to="/home"
              className="inline-flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-200 text-sm"
            >
              <FaHome />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-yellow-500/20 border border-yellow-400/30 rounded-xl backdrop-blur-sm">
            <p className="text-yellow-200 text-xs text-center font-medium">
              🔒 This is a secure admin area. All access attempts are monitored and logged.
            </p>
          </div>

          {/* Admin Credentials Info (for development) */}
          <div className="mt-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl backdrop-blur-sm">
            <p className="text-green-200 text-xs text-center font-medium">
              💡 Default Admin: admin@healthoplus.com | Password: Admin@123
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;