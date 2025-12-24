import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../config.js";
import { FaUsers, FaCalendarCheck, FaHospital } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdPending, MdCheckCircle, MdCancel } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import Loading from "../components/Loader/Loading.jsx";

const AdminHome = () => {
  // State to store all the data we fetch from backend
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalBookings: 0,
    pendingBookings: 0,
    approvedBookings: 0,
    cancelledBookings: 0,
    pendingDoctors: 0,
    approvedDoctors: 0,
  });
  
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data when component loads
  useEffect(() => {
    fetchAllData();
  }, []);

  // Function to fetch all statistics and recent data
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      // Fetch users data
      const usersRes = await fetch(`${BASE_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const usersData = await usersRes.json();

      // Fetch doctors data
      const doctorsRes = await fetch(`${BASE_URL}/admin/doctors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const doctorsData = await doctorsRes.json();

      // Fetch bookings data
      const bookingsRes = await fetch(`${BASE_URL}/admin/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const bookingsData = await bookingsRes.json();

      // Calculate statistics from the data we got
      const pendingBookings = bookingsData.filter((b) => b.status === "pending").length;
      const approvedBookings = bookingsData.filter((b) => b.status === "approved").length;
      const cancelledBookings = bookingsData.filter((b) => b.status === "cancelled").length;
      
      const pendingDoctors = doctorsData.filter((d) => d.isApproved === "pending").length;
      const approvedDoctors = doctorsData.filter((d) => d.isApproved === "approved").length;

      // Update state with calculated statistics
      setStats({
        totalUsers: usersData.length,
        totalDoctors: doctorsData.length,
        totalBookings: bookingsData.length,
        pendingBookings,
        approvedBookings,
        cancelledBookings,
        pendingDoctors,
        approvedDoctors,
      });

      // Get recent 5 bookings and users
      setRecentBookings(bookingsData.slice(0, 5));
      setRecentUsers(usersData.slice(0, 5));
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Statistics Cards - Main Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Users</p>
              <h3 className="text-4xl font-bold mt-2">{stats.totalUsers}</h3>
              <Link to="/admin/users" className="text-xs text-blue-100 hover:text-white mt-2 inline-block">
                View All →
              </Link>
            </div>
            <FaUsers className="text-6xl text-blue-300 opacity-50" />
          </div>
        </div>

        {/* Total Doctors Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Doctors</p>
              <h3 className="text-4xl font-bold mt-2">{stats.totalDoctors}</h3>
              <Link to="/admin/doctors" className="text-xs text-green-100 hover:text-white mt-2 inline-block">
                View All →
              </Link>
            </div>
            <FaUserDoctor className="text-6xl text-green-300 opacity-50" />
          </div>
        </div>

        {/* Total Bookings Card */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Bookings</p>
              <h3 className="text-4xl font-bold mt-2">{stats.totalBookings}</h3>
              <Link to="/admin/bookings" className="text-xs text-purple-100 hover:text-white mt-2 inline-block">
                View All →
              </Link>
            </div>
            <FaCalendarCheck className="text-6xl text-purple-300 opacity-50" />
          </div>
        </div>

        {/* Pending Approvals Card */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Pending Doctors</p>
              <h3 className="text-4xl font-bold mt-2">{stats.pendingDoctors}</h3>
              <Link to="/admin/doctors" className="text-xs text-orange-100 hover:text-white mt-2 inline-block">
                Review Now →
              </Link>
            </div>
            <FaHospital className="text-6xl text-orange-300 opacity-50" />
          </div>
        </div>
      </div>

      {/* Bookings Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Pending Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Bookings</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">{stats.pendingBookings}</h3>
            </div>
            <MdPending className="text-5xl text-yellow-500" />
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: `${(stats.pendingBookings / stats.totalBookings) * 100 || 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Approved Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Approved Bookings</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">{stats.approvedBookings}</h3>
            </div>
            <MdCheckCircle className="text-5xl text-green-500" />
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${(stats.approvedBookings / stats.totalBookings) * 100 || 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Cancelled Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Cancelled Bookings</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">{stats.cancelledBookings}</h3>
            </div>
            <MdCancel className="text-5xl text-red-500" />
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${(stats.cancelledBookings / stats.totalBookings) * 100 || 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout for Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FaCalendarCheck />
              Recent Bookings
            </h2>
          </div>
          <div className="p-6">
            {recentBookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">User</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2 text-sm text-gray-800">{booking.user?.name || "N/A"}</td>
                        <td className="py-3 px-2">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              booking.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-sm text-gray-600">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No bookings available</p>
            )}
            <Link
              to="/admin/bookings"
              className="text-purple-600 hover:text-purple-800 text-sm font-medium mt-4 inline-block"
            >
              View All Bookings →
            </Link>
          </div>
        </div>

        {/* Recent Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FaUsers />
              Recent Users
            </h2>
          </div>
          <div className="p-6">
            {recentUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Name</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2 text-sm text-gray-800">{user.name}</td>
                        <td className="py-3 px-2 text-sm text-gray-600">{user.email}</td>
                        <td className="py-3 px-2">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            {user.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No users available</p>
            )}
            <Link
              to="/admin/users"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-4 inline-block"
            >
              View All Users →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="mt-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <BsGraphUpArrow className="text-3xl" />
          <h2 className="text-2xl font-bold">System Overview</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-indigo-100 text-sm">Approved Doctors</p>
            <p className="text-3xl font-bold mt-1">{stats.approvedDoctors}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-indigo-100 text-sm">Pending Doctors</p>
            <p className="text-3xl font-bold mt-1">{stats.pendingDoctors}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-indigo-100 text-sm">Total Patients</p>
            <p className="text-3xl font-bold mt-1">{stats.totalUsers}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-indigo-100 text-sm">Active Bookings</p>
            <p className="text-3xl font-bold mt-1">{stats.approvedBookings}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
