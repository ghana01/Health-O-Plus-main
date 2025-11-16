import { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import AdminLayout from "./layout/Admin-Layout.jsx";
import { authContext } from "./context/AuthContext";
import AdminHome from "./pages/Admin-Home";
import AdminUsers from "./pages/Admin-Users";
import AdminDoctors from "./pages/Admin-Doctors";
import AdminBookings from "./pages/Admin-Bookings";
import AdminUpdate from "./pages/Admin-Update";
import DeleteUser from "./pages/DeleteUser";
import DeleteDoctor from "./pages/DeleteDoctor";

function App() {
  const { user, role, token } = useContext(authContext);

  useEffect(() => {
    console.log("User: ", user);
    console.log("role: ", role);
    console.log("token: ", token);
  }, [user, role, token]);

  // If admin is logged in, show admin routes
  if (token && role === "admin") {
    return (
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/home" replace />} />
          <Route path="admin/home" element={<AdminHome />} />
          <Route path="admin/users" element={<AdminUsers />} />
          <Route path="admin/doctors" element={<AdminDoctors />} />
          <Route path="admin/bookings" element={<AdminBookings />} />
          <Route path="admin/users/:id/edit" element={<AdminUpdate />} />
          <Route path="delete/user/:id" element={<DeleteUser />} />
          <Route path="delete/doctor/:id" element={<DeleteDoctor />} />
        </Route>
      </Routes>
    );
  }

  // Default layout for regular users
  return <Layout />;
}

export default App;
