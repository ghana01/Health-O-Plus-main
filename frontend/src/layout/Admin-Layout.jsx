import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaUser, FaHome } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { BsFillTicketDetailedFill } from "react-icons/bs";
import { authContext } from "../context/AuthContext";

const AdminLayout = () => {
  const { user, dispatch } = useContext(authContext);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <nav className="flex justify-between rounded-full m-5 bg-gray-200 items-center py-4 px-6">
        <ul className="flex justify-around gap-44">
          <li>
            <NavLink to="/admin/home" className="flex items-center">
              <FaHome className="mr-1" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className="flex items-center">
              <FaUser className="mr-1" />
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/doctors" className="flex items-center">
              <FaUserDoctor className="mr-1" />
              Doctors
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/bookings" className="flex items-center">
              <BsFillTicketDetailedFill className="mr-1" />
              Bookings
            </NavLink>
          </li>
        </ul>
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          )}
        </div>
      </nav>
      <div className="container font-semibold text-xl">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
