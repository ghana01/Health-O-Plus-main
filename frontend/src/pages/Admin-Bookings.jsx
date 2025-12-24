import { useEffect, useState } from "react";
import { BASE_URL } from "../config.js";
import useFetchData from "../hooks/useFetchData.jsx";
import { BiSearch } from "react-icons/bi";
import { MdPayments, MdCheckCircle, MdPending, MdCancel } from "react-icons/md";
import { FaUserDoctor, FaUser, FaTicket } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import Loading from "../components/Loader/Loading.jsx";
import Error from "../components/Error/Error.jsx";

const AdminBookings = () => {
  // State for users and doctors data
  const [users, setUsers] = useState({});
  const [doctors, setDoctors] = useState({});

  // Fetch bookings from API
  const {
    data: bookings,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/admin/bookings`);

  // State for search and filter functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all"); // all, pending, approved, cancelled
  const [filterPayment, setFilterPayment] = useState("all"); // all, paid, unpaid

  // Fetch all users data from backend
  const getAllUsersData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/admin/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Users data:", data);
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  // Fetch all doctors data from backend
  const getAllDoctorsData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/admin/doctors`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Doctors data:", data);
      setDoctors(data);
    } catch (error) {
      console.log("Error fetching doctors:", error);
    }
  };

  // Load users and doctors when component mounts
  useEffect(() => {
    getAllUsersData();
    getAllDoctorsData();
  }, []);

  // Filter bookings based on search term, status, and payment
  useEffect(() => {
    if (bookings) {
      let filtered = bookings;

      // Apply search filter - search by user name, doctor name, or booking ID
      if (searchTerm) {
        filtered = filtered.filter(
          (booking) =>
            booking.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking._id?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply status filter
      if (filterStatus !== "all") {
        filtered = filtered.filter((booking) => booking.status === filterStatus);
      }

      // Apply payment filter
      if (filterPayment === "paid") {
        filtered = filtered.filter((booking) => booking.isPaid === true);
      } else if (filterPayment === "unpaid") {
        filtered = filtered.filter((booking) => booking.isPaid === false);
      }

      setFilteredBookings(filtered);
    }
  }, [searchTerm, filterStatus, filterPayment, bookings]);

  // Calculate statistics for display
  const totalBookings = bookings?.length || 0;
  const pendingBookings = bookings?.filter((b) => b.status === "pending").length || 0;
  const approvedBookings = bookings?.filter((b) => b.status === "approved").length || 0;
  const paidBookings = bookings?.filter((b) => b.isPaid === true).length || 0;
  const totalRevenue = bookings?.reduce((sum, b) => sum + (b.isPaid ? b.ticketPrice : 0), 0) || 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Booking Management</h1>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <BiSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search by patient name, doctor name, or booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Filter Buttons Row 1 - Status */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Filter by Status:</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === "all"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All Bookings
              </button>
              <button
                onClick={() => setFilterStatus("pending")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === "pending"
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Pending ({pendingBookings})
              </button>
              <button
                onClick={() => setFilterStatus("approved")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === "approved"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Approved ({approvedBookings})
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

          {/* Filter Buttons Row 2 - Payment */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Filter by Payment:</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterPayment("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterPayment === "all"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterPayment("paid")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterPayment === "paid"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Paid ({paidBookings})
              </button>
              <button
                onClick={() => setFilterPayment("unpaid")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterPayment === "unpaid"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Unpaid ({totalBookings - paidBookings})
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && <Loading />}
      {error && <Error />}
      {!loading && !error && (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
              <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-800">{totalBookings}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
              <p className="text-gray-600 text-sm font-medium">Paid Bookings</p>
              <p className="text-3xl font-bold text-green-600">{paidBookings}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
              <p className="text-gray-600 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{pendingBookings}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-blue-600">₹{totalRevenue}</p>
            </div>
          </div>

          {/* Bookings Grid */}
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBookings.map((booking, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Header with Status Badge */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FaTicket className="text-white text-lg" />
                    <span className="text-white font-semibold text-sm">
                      Booking ID: #{booking._id?.slice(-6)}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      booking.status === "approved"
                        ? "bg-green-500 text-white"
                        : booking.status === "pending"
                        ? "bg-yellow-400 text-gray-800"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {booking.status?.toUpperCase()}
                  </span>
                </div>

                {/* Booking Details */}
                <div className="p-4 space-y-3">
                  {/* Patient Info */}
                  <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg">
                    <FaUser className="text-blue-600 text-xl mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium">Patient</p>
                      <p className="text-sm font-bold text-gray-800 truncate">
                        {booking.user?.name || "Unknown User"}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {booking.user?.email || "No email"}
                      </p>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                    <FaUserDoctor className="text-green-600 text-xl mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium">Doctor</p>
                      <p className="text-sm font-bold text-gray-800 truncate">
                        {booking.doctor?.name || "Unknown Doctor"}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {booking.doctor?.specialization || "General"}
                      </p>
                    </div>
                  </div>

                  {/* Date Info */}
                  <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg">
                    <FaCalendarAlt className="text-purple-600 text-lg flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">Appointment Date</p>
                      <p className="text-sm font-bold text-gray-800">
                        {booking.appointmentDate
                          ? new Date(booking.appointmentDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : new Date(booking.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                      </p>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <MdPayments className="text-indigo-600 text-xl" />
                        <span className="text-sm font-medium text-gray-700">Payment Status</span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                          booking.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {booking.isPaid ? (
                          <>
                            <MdCheckCircle /> Paid
                          </>
                        ) : (
                          <>
                            <MdCancel /> Unpaid
                          </>
                        )}
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-lg">
                      <p className="text-xs opacity-90">Ticket Price</p>
                      <p className="text-2xl font-bold">
                        ₹{booking.ticketPrice || "0"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer with timestamp */}
                <div className="bg-gray-50 px-4 py-2 border-t">
                  <p className="text-xs text-gray-500">
                    Created: {new Date(booking.createdAt).toLocaleString("en-US")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredBookings.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <FaTicket className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">
                No bookings found matching your criteria.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminBookings;
