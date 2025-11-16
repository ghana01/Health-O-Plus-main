import React from "react";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Signup from "../pages/Signup";
import Symptomchk from "../pages/Symptomchk";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import { Routes, Route } from "react-router-dom";
import MyAccount from "../Dashboard/user-account/MyAccount";
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import { services } from "../assets/data/services.js";
import DiseasePage from "../components/Services/Disease/DiseasePage.jsx";
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
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/symptomchk" element={<Symptomchk />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/video-call/:roomId" element={<VideoCall />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
      <Route path="/ai-consult" element={<AIConsult />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      
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
        path="/services"
        element={
          <ProtectedRoute allowedRoles={["patient", "doctor", "admin"]}>
            <Services />
          </ProtectedRoute>
        }
      />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
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
      {/* Dynamically create routes for each disease */}
      {services.map((service) => (
        <Route
          key={service.id}
          path={`/disease/${service.id}`}
          element={<DiseasePage service={service} />} // Pass the service data to the DiseasePage component
        />
      ))}
    </Routes>
  );
};

export default Routers;
