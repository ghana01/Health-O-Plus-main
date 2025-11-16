import React, { useEffect, useState } from "react";
import { BASE_URL, token } from "../config.js";
import useFetchData from "../hooks/useFetchData.jsx";
import defaultImg from "../assets/images/default.avif";
import { BiEditAlt, BiSearch } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { MdOutlinePersonPin } from "react-icons/md";
import { PiGenderFemaleBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";
import { Link } from "react-router-dom";
import Loading from "../components/Loader/Loading.jsx";
import Error from "../components/Error/Error.jsx";

const AdminUsers = () => {
  // Get users data from API
  const {
    data: users,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/admin/users`);

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  console.log("call users");

  const getAllUsersData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Users data:", data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    if (users) {
      const filtered = users.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section with Search */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">User Management</h1>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="relative">
            <BiSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search users by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {loading && <Loading />}
      {error && <Error />}
      {!loading && !error && (
        <>
          {/* Statistics Bar */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">{users.length}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Showing Results</p>
                <p className="text-2xl font-bold text-blue-600">{filteredUsers.length}</p>
              </div>
            </div>
          </div>

          {/* Users Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUsers.map((user, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                {/* Action Buttons */}
                <div className="flex justify-between p-3 bg-gradient-to-r from-blue-500 to-blue-600">
                  <Link to={`/admin/users/${user._id}/edit`}>
                    <button className="bg-white text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                      <BiEditAlt className="text-xl" />
                    </button>
                  </Link>
                  <Link to={`/delete/user/${user._id}`}>
                    <button className="bg-white text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors">
                      <MdDelete className="text-xl" />
                    </button>
                  </Link>
                </div>

                {/* User Image */}
                <div className="flex justify-center pt-4 px-4">
                  <img
                    className="w-32 h-32 object-cover rounded-full border-4 border-blue-200 shadow-lg"
                    src={user.photo || `${defaultImg}`}
                    alt={user._id}
                  />
                </div>

                {/* User Information */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-x-2 bg-gray-50 p-2 rounded-lg">
                    <FaUser className="text-blue-500 text-lg" />
                    <h2 className="text-sm font-semibold text-gray-800 truncate">{user.name}</h2>
                  </div>
                  <div className="flex items-center gap-x-2 bg-gray-50 p-2 rounded-lg">
                    <MdMarkEmailUnread className="text-green-500 text-lg" />
                    <h2 className="text-xs text-gray-600 truncate">{user.email}</h2>
                  </div>
                  <div className="flex items-center gap-x-2 bg-gray-50 p-2 rounded-lg">
                    <MdOutlinePersonPin className="text-purple-500 text-lg" />
                    <h2 className="text-sm text-gray-700">
                      <span className="font-medium">Role:</span> {user.role || "Unknown"}
                    </h2>
                  </div>
                  <div className="flex items-center gap-x-2 bg-gray-50 p-2 rounded-lg">
                    <PiGenderFemaleBold className="text-pink-500 text-lg" />
                    <h2 className="text-sm text-gray-700 capitalize">{user.gender}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredUsers.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 text-lg">No users found matching your search.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminUsers;
