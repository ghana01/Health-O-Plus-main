import React from "react";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import { Routes, Route } from "react-router-dom";
import MyAccount from "../Dashboard/user-account/MyAccount";
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import AIConsult from '../pages/AIConsult';
import VideoCall from '../pages/VideoCall.jsx';
import AdminLogin from "../pages/AdminLogin";
import AdminHome from "../pages/Admin-Home";
import AdminUsers from "../pages/Admin-Users";
import AdminDoctors from "../pages/Admin-Doctors";
import AdminBookings from "../pages/Admin-Bookings";
import AdminUpdate from "../pages/Admin-Update";
import DeleteUser from "../pages/DeleteUser";
import DeleteDoctor from "../pages/DeleteDoctor";

const Routers = () => {
  return (
    <Routes>
      {/* Public routes - No authentication required */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      
      {/* Protected routes - Authentication required */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["patient", "doctor", "admin"]}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute allowedRoles={["patient", "doctor", "admin"]}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors"
        element={
          <ProtectedRoute allowedRoles={["patient", "doctor", "admin"]}>
            <Doctors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/:id"
        element={
          <ProtectedRoute allowedRoles={["patient", "doctor", "admin"]}>
            <DoctorDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute allowedRoles={["patient", "doctor", "admin"]}>
            <Contact />
          </ProtectedRoute>
        }
      />
      <Route
        path="/video-call/:roomId"
        element={
          <ProtectedRoute allowedRoles={["patient", "doctor", "admin"]}>
            <VideoCall />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-consult"
        element={
          <ProtectedRoute allowedRoles={["patient", "doctor", "admin"]}>
            <AIConsult />
          </ProtectedRoute>
        }
      />
      
      {/* Admin Routes */}
      <Route
        path="/admin/home"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/doctors"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDoctors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users/:id/edit"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminUpdate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/delete/user/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DeleteUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/delete/doctor/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DeleteDoctor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout-success"
        element={
          <ProtectedRoute allowedRoles={["patient", "doctor", "admin"]}>
            <CheckoutSuccess />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/profile/me"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
