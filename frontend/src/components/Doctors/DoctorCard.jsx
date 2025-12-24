import React, { useState, useEffect } from "react";
import starIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { FaClock } from "react-icons/fa";

// Helper function to check if video call is accessible
const isVideoCallAccessible = (appointment) => {
  if (!appointment || !appointment.appointmentDate || !appointment.appointmentTime) {
    return true; // If no appointment time set, allow access
  }
  
  const now = new Date();
  const appointmentDate = new Date(appointment.appointmentDate);
  
  // Parse appointment time (format: "HH:MM")
  const [hours, minutes] = (appointment.appointmentTime || "00:00").split(":").map(Number);
  appointmentDate.setHours(hours, minutes, 0, 0);
  
  // Allow access 5 minutes before appointment time and up to 1 hour after
  const startWindow = new Date(appointmentDate.getTime() - 5 * 60 * 1000); // 5 minutes before
  const endWindow = new Date(appointmentDate.getTime() + 60 * 60 * 1000); // 1 hour after
  
  return now >= startWindow && now <= endWindow;
};

// Format time remaining until appointment
const getTimeUntilAppointment = (appointment) => {
  if (!appointment || !appointment.appointmentDate || !appointment.appointmentTime) {
    return null;
  }
  
  const now = new Date();
  const appointmentDate = new Date(appointment.appointmentDate);
  const [hours, minutes] = (appointment.appointmentTime || "00:00").split(":").map(Number);
  appointmentDate.setHours(hours, minutes, 0, 0);
  
  const diff = appointmentDate - now;
  if (diff <= 0) return null;
  
  const hoursRemaining = Math.floor(diff / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hoursRemaining > 24) {
    const days = Math.floor(hoursRemaining / 24);
    return `${days} day${days > 1 ? 's' : ''} left`;
  } else if (hoursRemaining > 0) {
    return `${hoursRemaining}h ${minutesRemaining}m left`;
  } else {
    return `${minutesRemaining}m left`;
  }
};

const DoctorCard = ({ doctor, appointment }) => {
  const {
    name,
    averageRating,
    totalRating,
    photo,
    specialization,
    experiences,
  } = doctor;

  // State to trigger re-render for time-based access
  const [, setTick] = useState(0);
  
  // Re-check every minute if there's an appointment
  useEffect(() => {
    if (appointment && appointment.appointmentTime) {
      const interval = setInterval(() => setTick(t => t + 1), 60000);
      return () => clearInterval(interval);
    }
  }, [appointment]);

  // Use a default photo if none is provided
  const defaultPhoto = "path/to/default/doctor/image.png"; // Add a default image path
  
  const canAccessVideoCall = isVideoCallAccessible(appointment);
  const timeRemaining = getTimeUntilAppointment(appointment);

  return (
    <div className="p-3 lg:p-5">
      <div>
        <img src={photo || defaultPhoto} className="w-full" alt={name} />
      </div>
      <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 mg:mt-5">
        {name}
      </h2>

      <div className="mt-2 lg:mt-4 flex items-center justify-between">
        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
          {specialization || "General"}
        </span>
        <div className="flex items-center gap-[6px]">
          <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
            <img src={starIcon} alt="" /> {averageRating || 0}
          </span>
          <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
            ({totalRating || 0})
          </span>
        </div>
      </div>

      <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
        <div>
          <p className="text-[14px] leading-6 font-[400] text-textColor">
            {experiences && experiences[0]?.hospital 
              ? `At ${experiences[0].hospital}`
              : "Hospital information not available"}
          </p>
          {/* Show appointment time if available */}
          {appointment && appointment.appointmentTime && (
            <p className="text-[12px] text-gray-500 mt-1">
              📅 {new Date(appointment.appointmentDate).toLocaleDateString()} at {appointment.appointmentTime}
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          {/* Video call button - only accessible at appointment time */}
          {appointment && appointment.videoCallRoomId && canAccessVideoCall && (
            <Link
              to={`/video-call/${appointment.videoCallRoomId}`}
              className="px-4 py-2 text-white bg-primaryColor rounded-md hover:bg-blue-700 transition-colors animate-pulse"
            >
              Join Call Now
            </Link>
          )}
          {/* Show time remaining if video call is not yet accessible */}
          {appointment && appointment.videoCallRoomId && !canAccessVideoCall && timeRemaining && (
            <div
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md flex items-center gap-2"
              title={`Video call will be available at ${appointment.appointmentTime} on ${new Date(appointment.appointmentDate).toLocaleDateString()}`}
            >
              <FaClock className="text-yellow-500" />
              <span className="text-sm">{timeRemaining}</span>
            </div>
          )}
          {appointment && !appointment.videoCallRoomId && (
            <button
              disabled
              className="px-4 py-2 text-gray-400 bg-gray-300 rounded-md cursor-not-allowed"
              title="Video call link not available"
            >
              No Call Link
            </button>
          )}
          <Link
            to={`/doctors/${doctor._id}`}
            className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none"
          >
            <BsArrowRight className="group-hover:text-white w-6 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
