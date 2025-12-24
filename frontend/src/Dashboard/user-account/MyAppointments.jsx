import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users/appointments/my-appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch appointments");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const joinVideoCall = (roomId) => {
    navigate(`/video-call/${roomId}`);
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    
    try {
      const res = await fetch(`${BASE_URL}/bookings/cancel/${bookingId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Appointment cancelled");
        fetchBookings();
      }
    } catch (error) {
      toast.error("Failed to cancel appointment");
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    if (filter === "upcoming") {
      return booking.status === "approved" && new Date(booking.appointmentDate) >= new Date();
    }
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

  const isUpcoming = (booking) => {
    return (
      booking.status === "approved" &&
      booking.appointmentDate &&
      new Date(booking.appointmentDate) >= new Date()
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-headingColor mb-6">My Appointments</h2>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "upcoming", "pending", "completed", "cancelled"].map((status) => (
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
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className={`border rounded-lg p-4 ${
                isUpcoming(booking) ? "border-l-4 border-l-primaryColor" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={booking.doctor?.photo || "/default-avatar.png"}
                    alt=""
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">
                      Dr. {booking.doctor?.name}
                    </h4>
                    <p className="text-gray-600">
                      {booking.doctor?.specialization || "General"}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                      {isUpcoming(booking) && (
                        <span className="text-xs text-primaryColor font-medium">
                          Upcoming
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-left md:text-right">
                  <p className="font-medium">
                    {booking.appointmentDate
                      ? new Date(booking.appointmentDate).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Date not set"}
                  </p>
                  {booking.appointmentTime && (
                    <p className="text-lg font-bold text-primaryColor">
                      {booking.appointmentTime}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">₹{booking.ticketPrice}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex flex-wrap gap-2">
                {booking.status === "approved" && booking.videoCallRoomId && (
                  <button
                    onClick={() => joinVideoCall(booking.videoCallRoomId)}
                    className="px-4 py-2 bg-irisBlueColor text-white rounded-md hover:bg-irisBlueColor/90"
                  >
                    Join Video Call
                  </button>
                )}
                {booking.status === "approved" && !booking.videoCallRoomId && (
                  <span className="px-4 py-2 text-sm text-gray-500 bg-gray-100 rounded-md">
                    Video call link will be available soon
                  </span>
                )}
                {(booking.status === "pending" || isUpcoming(booking)) && (
                  <button
                    onClick={() => cancelBooking(booking._id)}
                    className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
                  >
                    Cancel Appointment
                  </button>
                )}
                {booking.status === "completed" && (
                  <span className="text-sm text-gray-500">
                    Consultation completed on{" "}
                    {new Date(booking.updatedAt).toLocaleDateString()}
                  </span>
                )}
              </div>

              {/* Video Call Info */}
              {isUpcoming(booking) && booking.videoCallRoomId && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm">
                  <p className="text-blue-800">
                    📹 Video call room is ready. Join at your scheduled time.
                  </p>
                  <p className="text-blue-600 mt-1">
                    Room ID: <code className="bg-blue-100 px-1 rounded">{booking.videoCallRoomId}</code>
                  </p>
                </div>
              )}
            </div>
          ))}
          {filteredBookings.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No appointments found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
