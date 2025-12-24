import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import { AiOutlineBell, AiOutlineDelete, AiOutlinePause, AiOutlinePlayCircle } from "react-icons/ai";

const MedicationReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    medicineName: "",
    dosage: "",
    frequency: "once_daily",
    times: ["08:00"],
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    notes: "",
  });

  const token = localStorage.getItem("token");

  const frequencies = [
    { value: "once_daily", label: "Once Daily", timesCount: 1 },
    { value: "twice_daily", label: "Twice Daily", timesCount: 2 },
    { value: "three_times_daily", label: "Three Times Daily", timesCount: 3 },
    { value: "four_times_daily", label: "Four Times Daily", timesCount: 4 },
    { value: "weekly", label: "Weekly", timesCount: 1 },
    { value: "as_needed", label: "As Needed", timesCount: 1 },
  ];

  const fetchReminders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/medication-reminders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setReminders(data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch reminders");
    }
    setLoading(false);
  };

  const fetchTodaySchedule = async () => {
    try {
      const res = await fetch(`${BASE_URL}/medication-reminders/today`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setTodaySchedule(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch today's schedule");
    }
  };

  useEffect(() => {
    fetchReminders();
    fetchTodaySchedule();
  }, []);

  const handleFrequencyChange = (frequency) => {
    const config = frequencies.find((f) => f.value === frequency);
    const times = Array(config.timesCount).fill("").map((_, i) => {
      const hour = 8 + i * (12 / config.timesCount);
      return `${Math.floor(hour).toString().padStart(2, "0")}:00`;
    });
    setFormData({ ...formData, frequency, times });
  };

  const handleTimeChange = (index, value) => {
    const newTimes = [...formData.times];
    newTimes[index] = value;
    setFormData({ ...formData, times: newTimes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/medication-reminders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Reminder created successfully");
        setShowForm(false);
        setFormData({
          medicineName: "",
          dosage: "",
          frequency: "once_daily",
          times: ["08:00"],
          startDate: new Date().toISOString().split("T")[0],
          endDate: "",
          notes: "",
        });
        fetchReminders();
        fetchTodaySchedule();
      }
    } catch (error) {
      toast.error("Failed to create reminder");
    }
  };

  const toggleReminder = async (reminderId) => {
    try {
      const res = await fetch(`${BASE_URL}/medication-reminders/${reminderId}/toggle`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        fetchReminders();
        fetchTodaySchedule();
      }
    } catch (error) {
      toast.error("Failed to toggle reminder");
    }
  };

  const deleteReminder = async (reminderId) => {
    if (!window.confirm("Delete this medication reminder?")) return;
    
    try {
      const res = await fetch(`${BASE_URL}/medication-reminders/${reminderId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Reminder deleted");
        fetchReminders();
        fetchTodaySchedule();
      }
    } catch (error) {
      toast.error("Failed to delete reminder");
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-headingColor">Medication Reminders</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primaryColor text-white px-4 py-2 rounded-md hover:bg-primaryColor/90"
        >
          {showForm ? "Cancel" : "+ Add Reminder"}
        </button>
      </div>

      {/* Today's Schedule */}
      <div className="mb-8 p-4 bg-gradient-to-r from-primaryColor/10 to-irisBlueColor/10 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AiOutlineBell className="text-primaryColor" />
          Today's Medication Schedule
        </h3>
        {todaySchedule.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {todaySchedule.map((item, index) => {
              const isPast = item.time < getCurrentTime();
              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    isPast ? "bg-green-100" : "bg-white"
                  } border`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primaryColor">{item.time}</span>
                    {isPast && <span className="text-xs text-green-600">✓ Done</span>}
                  </div>
                  <p className="font-medium mt-1">{item.medicineName}</p>
                  <p className="text-sm text-gray-600">{item.dosage}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No medications scheduled for today.</p>
        )}
      </div>

      {/* Add Reminder Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Medicine Name</label>
              <input
                type="text"
                value={formData.medicineName}
                onChange={(e) => setFormData({ ...formData, medicineName: e.target.value })}
                className="w-full border rounded-md px-3 py-2"
                placeholder="e.g., Aspirin"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Dosage</label>
              <input
                type="text"
                value={formData.dosage}
                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                className="w-full border rounded-md px-3 py-2"
                placeholder="e.g., 500mg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Frequency</label>
              <select
                value={formData.frequency}
                onChange={(e) => handleFrequencyChange(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              >
                {frequencies.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date (Optional)</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Reminder Times</label>
            <div className="flex flex-wrap gap-2">
              {formData.times.map((time, index) => (
                <input
                  key={index}
                  type="time"
                  value={time}
                  onChange={(e) => handleTimeChange(index, e.target.value)}
                  className="border rounded-md px-3 py-2"
                  required
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Notes</label>
            <input
              type="text"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full border rounded-md px-3 py-2"
              placeholder="e.g., Take after meals"
            />
          </div>

          <button
            type="submit"
            className="bg-primaryColor text-white px-4 py-2 rounded-md hover:bg-primaryColor/90"
          >
            Create Reminder
          </button>
        </form>
      )}

      {/* All Reminders */}
      <h3 className="text-lg font-semibold mb-4">All Medications</h3>
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="space-y-3">
          {reminders.map((reminder) => (
            <div
              key={reminder._id}
              className={`p-4 border rounded-lg ${
                reminder.isActive ? "bg-white" : "bg-gray-100 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-lg">{reminder.medicineName}</h4>
                  <p className="text-gray-600">{reminder.dosage}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleReminder(reminder._id)}
                    className={`p-2 rounded-full ${
                      reminder.isActive
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                    title={reminder.isActive ? "Pause" : "Resume"}
                  >
                    {reminder.isActive ? <AiOutlinePause /> : <AiOutlinePlayCircle />}
                  </button>
                  <button
                    onClick={() => deleteReminder(reminder._id)}
                    className="p-2 rounded-full bg-red-100 text-red-600"
                    title="Delete"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                <span>
                  📅 {frequencies.find((f) => f.value === reminder.frequency)?.label}
                </span>
                <span>⏰ {reminder.times.join(", ")}</span>
                {reminder.notes && <span>📝 {reminder.notes}</span>}
              </div>
            </div>
          ))}
          {reminders.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No medication reminders set. Add one to stay on track!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicationReminders;
