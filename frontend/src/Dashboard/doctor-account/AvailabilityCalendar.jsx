import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";

const AvailabilityCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newSlot, setNewSlot] = useState({ startTime: "09:00", endTime: "09:30" });

  const token = localStorage.getItem("token");

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const startDate = new Date(selectedDate);
      const endDate = new Date(selectedDate);
      endDate.setDate(endDate.getDate() + 7);

      const res = await fetch(
        `${BASE_URL}/time-slots/doctor?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (data.success) {
        setSlots(data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch slots");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSlots();
  }, [selectedDate]);

  const handleAddSlot = async () => {
    try {
      const res = await fetch(`${BASE_URL}/time-slots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: selectedDate,
          slots: [newSlot],
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Time slot added successfully");
        fetchSlots();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to add slot");
    }
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      const res = await fetch(`${BASE_URL}/time-slots/${slotId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Slot deleted");
        fetchSlots();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete slot");
    }
  };

  const generateQuickSlots = async () => {
    const quickSlots = [];
    for (let hour = 9; hour < 17; hour++) {
      quickSlots.push({
        startTime: `${hour.toString().padStart(2, '0')}:00`,
        endTime: `${hour.toString().padStart(2, '0')}:30`,
      });
      quickSlots.push({
        startTime: `${hour.toString().padStart(2, '0')}:30`,
        endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
      });
    }

    try {
      const res = await fetch(`${BASE_URL}/time-slots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: selectedDate,
          slots: quickSlots,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Day slots generated successfully");
        fetchSlots();
      }
    } catch (error) {
      toast.error("Failed to generate slots");
    }
  };

  // Group slots by date
  const slotsByDate = slots.reduce((acc, slot) => {
    const date = new Date(slot.date).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(slot);
    return acc;
  }, {});

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-headingColor mb-6">Availability Calendar</h2>

      {/* Date Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor"
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      {/* Add Single Slot */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Add Time Slot</h3>
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Start Time</label>
            <input
              type="time"
              value={newSlot.startTime}
              onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
              className="border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">End Time</label>
            <input
              type="time"
              value={newSlot.endTime}
              onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
              className="border rounded-md px-3 py-2"
            />
          </div>
          <button
            onClick={handleAddSlot}
            className="bg-primaryColor text-white px-4 py-2 rounded-md hover:bg-primaryColor/90"
          >
            Add Slot
          </button>
          <button
            onClick={generateQuickSlots}
            className="bg-irisBlueColor text-white px-4 py-2 rounded-md hover:bg-irisBlueColor/90"
          >
            Generate Full Day (9AM-5PM)
          </button>
        </div>
      </div>

      {/* Slots Display */}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="space-y-6">
          {Object.entries(slotsByDate).map(([date, dateSlots]) => (
            <div key={date} className="border rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-3">{date}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {dateSlots.sort((a, b) => a.startTime.localeCompare(b.startTime)).map((slot) => (
                  <div
                    key={slot._id}
                    className={`p-3 rounded-lg text-center ${
                      slot.isBooked
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    <div className="font-medium">
                      {slot.startTime} - {slot.endTime}
                    </div>
                    <div className="text-xs mt-1">
                      {slot.isBooked ? "Booked" : "Available"}
                    </div>
                    {!slot.isBooked && (
                      <button
                        onClick={() => handleDeleteSlot(slot._id)}
                        className="text-xs text-red-600 hover:underline mt-1"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {Object.keys(slotsByDate).length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No slots available for this week. Add slots to start accepting appointments.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AvailabilityCalendar;
