import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formateDate } from "../../utils/formatDate.js";
import { FaClock } from "react-icons/fa";

// Helper function to check if video call is accessible
const isVideoCallAccessible = (item) => {
  if (!item || !item.appointmentDate || !item.appointmentTime) {
    return true; // If no appointment time set, allow access
  }
  
  const now = new Date();
  const appointmentDate = new Date(item.appointmentDate);
  
  // Parse appointment time (format: "HH:MM")
  const [hours, minutes] = (item.appointmentTime || "00:00").split(":").map(Number);
  appointmentDate.setHours(hours, minutes, 0, 0);
  
  // Allow access 5 minutes before appointment time and up to 1 hour after
  const startWindow = new Date(appointmentDate.getTime() - 5 * 60 * 1000);
  const endWindow = new Date(appointmentDate.getTime() + 60 * 60 * 1000);
  
  return now >= startWindow && now <= endWindow;
};

// Format time remaining until appointment
const getTimeUntilAppointment = (item) => {
  if (!item || !item.appointmentDate || !item.appointmentTime) {
    return null;
  }
  
  const now = new Date();
  const appointmentDate = new Date(item.appointmentDate);
  const [hours, minutes] = (item.appointmentTime || "00:00").split(":").map(Number);
  appointmentDate.setHours(hours, minutes, 0, 0);
  
  const diff = appointmentDate - now;
  if (diff <= 0) return null;
  
  const hoursRemaining = Math.floor(diff / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hoursRemaining > 24) {
    const days = Math.floor(hoursRemaining / 24);
    return `${days}d left`;
  } else if (hoursRemaining > 0) {
    return `${hoursRemaining}h ${minutesRemaining}m`;
  } else {
    return `${minutesRemaining}m left`;
  }
};

const Appointments = ({ appointments }) => {
  // State to trigger re-render for time-based access
  const [, setTick] = useState(0);
  
  // Re-check every minute
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  console.log("appointments: ", appointments);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max bg-white border-gray-300 border rounded-md">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-xs leading-4 uppercase">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Gender</th>
            <th className="py-3 px-6 text-left">Payment</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-left">Appointment</th>
            <th className="py-3 px-6 text-left">Test name</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {appointments?.map((item) => {
            const canAccessVideoCall = isVideoCallAccessible(item);
            const timeRemaining = getTimeUntilAppointment(item);
            
            return (
              <tr
                key={item._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <div className="text-sm font-semibold">
                        {item.user.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">{item.user.gender}</td>
                <td className="py-3 px-6 text-left">{item.status}</td>
                <td className="py-3 px-6 text-left">{item.ticketPrice}</td>
                <td className="py-3 px-6 text-left">
                  <div>
                    <p className="text-sm">
                      {item.appointmentDate 
                        ? new Date(item.appointmentDate).toLocaleDateString() 
                        : formateDate(item.updatedAt)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.appointmentTime || "Time not set"}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">{item.testName ||'Pneumonia'}</td>
                <td className="py-3 px-6 text-left">
                  {item.videoCallRoomId && canAccessVideoCall ? (
                    <Link
                      to={`/video-call/${item.videoCallRoomId}`}
                      className="px-4 py-2 text-white bg-primaryColor rounded-md hover:bg-blue-700 transition-colors animate-pulse"
                    >
                      Join Call Now
                    </Link>
                  ) : item.videoCallRoomId && !canAccessVideoCall && timeRemaining ? (
                    <div
                      className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md flex items-center gap-2 w-fit"
                      title={`Video call will be available at ${item.appointmentTime}`}
                    >
                      <FaClock className="text-yellow-500" />
                      <span className="text-sm">{timeRemaining}</span>
                    </div>
                  ) : (
                    <button
                      disabled
                      className="px-4 py-2 text-gray-400 bg-gray-300 rounded-md cursor-not-allowed"
                      title="Video call link not available for this appointment"
                    >
                      No Call Link
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
