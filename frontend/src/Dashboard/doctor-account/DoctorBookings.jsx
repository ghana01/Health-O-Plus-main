import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DoctorBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/bookings/doctor-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch bookings");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const res = await fetch(`${BASE_URL}/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Booking ${status}`);
        fetchBookings();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const joinVideoCall = (roomId) => {
    navigate(`/video-call/${roomId}`);
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-headingColor mb-6">My Bookings</h2>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "pending", "approved", "completed", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md capitalize ${
              filter === status
                ? "bg-primaryColor text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4">Patient</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Status</th>
                <th className="p-4">Price</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={booking.user?.photo || "/default-avatar.png"}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{booking.user?.name}</p>
                        <p className="text-sm text-gray-500">{booking.user?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p>{booking.appointmentDate ? new Date(booking.appointmentDate).toLocaleDateString() : "Not set"}</p>
                      <p className="text-sm text-gray-500">{booking.appointmentTime || "Time not set"}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4">${booking.ticketPrice}</td>
                  <td className="p-4">
                    <div className="flex gap-2 flex-wrap">
                      {booking.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateBookingStatus(booking._id, "approved")}
                            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking._id, "cancelled")}
                            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {booking.status === "approved" && booking.videoCallRoomId && (
                        <button
                          onClick={() => joinVideoCall(booking.videoCallRoomId)}
                          className="px-3 py-1 bg-irisBlueColor text-white rounded text-sm hover:bg-irisBlueColor/90"
                        >
                          Join Call
                        </button>
                      )}
                      {booking.status === "approved" && (
                        <button
                          onClick={() => updateBookingStatus(booking._id, "completed")}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredBookings.length === 0 && (
            <p className="text-center text-gray-500 py-8">No bookings found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorBookings;
