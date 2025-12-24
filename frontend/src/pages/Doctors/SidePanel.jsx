import React, { useState } from "react";
import convertTime from "../../utils/convertTime.js";

import { BASE_URL } from "./../../config.js";
import { toast } from "react-toastify";

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  // Get tomorrow's date as minimum selectable date
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Generate time slots based on doctor's available slots
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 17; hour++) {
      options.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 17) {
        options.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return options;
  };

  const bookingHandler = async () => {
    if (!appointmentDate) {
      toast.error("Please select an appointment date");
      return;
    }
    if (!appointmentTime) {
      toast.error("Please select an appointment time");
      return;
    }

    setIsBooking(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${BASE_URL}/bookings/create-booking/${doctorId}`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            appointmentDate,
            appointmentTime,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success(`Appointment booked for ${appointmentDate} at ${appointmentTime}! Video call will be available at the scheduled time.`);
      // Reset form
      setAppointmentDate("");
      setAppointmentTime("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="shadow-panelShadow p-3 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice} USD
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>

        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(item.startingTime)} -{" "}
                {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Appointment Date & Time Selection */}
      <div className="mt-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-headingColor mb-2">
            Select Appointment Date
          </label>
          <input
            type="date"
            min={getMinDate()}
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-headingColor mb-2">
            Select Appointment Time
          </label>
          <select
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
          >
            <option value="">Choose a time</option>
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button 
        onClick={bookingHandler} 
        disabled={isBooking}
        className={`btn px-2 w-full rounded-md mt-5 ${isBooking ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isBooking ? 'Booking...' : 'Book Appointment'}
      </button>
      
      <p className="text-xs text-gray-500 mt-2 text-center">
        Video call link will be accessible at the scheduled time
      </p>
    </div>
  );
};

export default SidePanel;
