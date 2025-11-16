import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, token } from "../config.js";
import useFetchData from "../hooks/useFetchData.jsx";
import defaultImg from "../assets/images/default.avif";
import { BiEditAlt, BiSearch } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { PiGenderFemaleBold } from "react-icons/pi";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";
import { Link } from "react-router-dom";
import Loading from "../components/Loader/Loading.jsx";
import Error from "../components/Error/Error.jsx";

const AdminDoctors = () => {
  const navigate = useNavigate();
  
  // Get doctors data from backend API
  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/admin/doctors`);

  // State for search and filter functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all"); // all, pending, approved, cancelled

  console.log("call doctors");

  // Function to fetch all doctors data
  const getAllUsersData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/doctors`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Doctors data:", data);
    } catch (error) {
      console.log("Error fetching doctors:", error);
    }
  };

  // Function to update doctor approval status
  const updateApprovalStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/doctors/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isApproved: newStatus }),
      });
      const data = await response.json();
      console.log("Updated doctor:", data);

      // Refresh the page to show updated data
      if (response.ok) {
        navigate(`/admin/doctors`);
        getAllUsersData();
      }
    } catch (error) {
      console.log("Error updating approval status:", error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  // Filter doctors based on search and status filter
  useEffect(() => {
    if (doctors) {
      let filtered = doctors;

      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(
          (doctor) =>
            doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply status filter
      if (filterStatus !== "all") {
        filtered = filtered.filter((doctor) => doctor.isApproved === filterStatus);
      }

      setFilteredDoctors(filtered);
    }
  }, [searchTerm, filterStatus, doctors]);

  // Calculate statistics for display
  const totalDoctors = doctors?.length || 0;
  const pendingDoctors = doctors?.filter((d) => d.isApproved === "pending").length || 0;
  const approvedDoctors = doctors?.filter((d) => d.isApproved === "approved").length || 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Doctor Management</h1>
        
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <BiSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search doctors by name, email, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === "all"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All Doctors
            </button>
            <button
              onClick={() => setFilterStatus("pending")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === "pending"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Pending ({pendingDoctors})
            </button>
            <button
              onClick={() => setFilterStatus("approved")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === "approved"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Approved ({approvedDoctors})
            </button>
            <button
              onClick={() => setFilterStatus("cancelled")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === "cancelled"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Cancelled
            </button>
          </div>
        </div>
      </div>

      {loading && <Loading />}
      {error && <Error />}
      {!loading && !error && (
        <>
          {/* Statistics Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-gray-600 text-sm">Total Doctors</p>
              <p className="text-3xl font-bold text-gray-800">{totalDoctors}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-gray-600 text-sm">Pending Approval</p>
              <p className="text-3xl font-bold text-yellow-600">{pendingDoctors}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-gray-600 text-sm">Showing Results</p>
              <p className="text-3xl font-bold text-green-600">{filteredDoctors.length}</p>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                {/* Action Buttons */}
                <div className="flex justify-between p-3 bg-gradient-to-r from-green-500 to-green-600">
                  <button className="bg-white text-green-600 p-2 rounded-lg hover:bg-green-50 transition-colors">
                    <BiEditAlt className="text-xl" />
                  </button>
                  <Link to={`/delete/doctor/${doctor._id}`}>
                    <button className="bg-white text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors">
                      <MdDelete className="text-xl" />
                    </button>
                  </Link>
                </div>

                {/* Doctor Image */}
                <div className="flex justify-center pt-4 px-4">
                  <img
                    className="w-32 h-32 object-cover rounded-full border-4 border-green-200 shadow-lg"
                    src={doctor.photo || `${defaultImg}`}
                    alt={doctor._id}
                  />
                </div>

                {/* Doctor Information */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-x-2 bg-gray-50 p-2 rounded-lg">
                    <FaUser className="text-green-500 text-lg" />
                    <h2 className="text-sm font-semibold text-gray-800 truncate">
                      {doctor.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-x-2 bg-gray-50 p-2 rounded-lg">
                    <MdMarkEmailUnread className="text-blue-500 text-lg" />
                    <h2 className="text-xs text-gray-600 truncate">{doctor.email}</h2>
                  </div>
                  <div className="flex items-center gap-x-2 bg-gray-50 p-2 rounded-lg">
                    <FaUserDoctor className="text-purple-500 text-lg" />
                    <h2 className="text-sm text-gray-700">
                      <span className="font-medium">Role:</span> {doctor.role || "Doctor"}
                    </h2>
                  </div>
                  <div className="flex items-center gap-x-2 bg-gray-50 p-2 rounded-lg">
                    <PiGenderFemaleBold className="text-pink-500 text-lg" />
                    <h2 className="text-sm text-gray-700 capitalize">{doctor.gender}</h2>
                  </div>

                  {/* Approval Status Dropdown */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <label
                      htmlFor={`approvalStatus-${doctor._id}`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Approval Status
                    </label>
                    <select
                      id={`approvalStatus-${doctor._id}`}
                      value={doctor.isApproved}
                      onChange={(e) =>
                        updateApprovalStatus(doctor._id, e.target.value)
                      }
                      className={`w-full border-2 rounded-lg p-2 font-medium transition-colors ${
                        doctor.isApproved === "approved"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : doctor.isApproved === "pending"
                          ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                          : "border-red-500 bg-red-50 text-red-700"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredDoctors.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <FaUserDoctor className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No doctors found matching your criteria.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDoctors;
