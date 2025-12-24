import TimeSlot from "../models/TimeSlotSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

// Create time slots for a doctor
export const createTimeSlots = async (req, res) => {
  const doctorId = req.userId;
  const { date, slots } = req.body; // slots: [{ startTime, endTime }]

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const createdSlots = [];
    for (const slot of slots) {
      const newSlot = new TimeSlot({
        doctor: doctorId,
        date: new Date(date),
        startTime: slot.startTime,
        endTime: slot.endTime,
        dayOfWeek: new Date(date).getDay(),
      });
      await newSlot.save();
      createdSlots.push(newSlot);
    }

    res.status(201).json({
      success: true,
      message: "Time slots created successfully",
      data: createdSlots,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get available slots for a doctor on a specific date
export const getAvailableSlots = async (req, res) => {
  const { doctorId, date } = req.query;

  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const slots = await TimeSlot.find({
      doctor: doctorId,
      date: { $gte: startOfDay, $lte: endOfDay },
      isBooked: false,
    }).sort({ startTime: 1 });

    res.status(200).json({ success: true, data: slots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all slots for a doctor (for calendar view)
export const getDoctorSlots = async (req, res) => {
  const doctorId = req.userId;
  const { startDate, endDate } = req.query;

  try {
    const query = { doctor: doctorId };
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const slots = await TimeSlot.find(query)
      .populate("booking")
      .sort({ date: 1, startTime: 1 });

    res.status(200).json({ success: true, data: slots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Book a time slot
export const bookTimeSlot = async (req, res) => {
  const userId = req.userId;
  const { slotId, doctorId, ticketPrice, notes } = req.body;

  try {
    const slot = await TimeSlot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ success: false, message: "Time slot not found" });
    }

    if (slot.isBooked) {
      return res.status(400).json({ success: false, message: "Time slot already booked" });
    }

    // Generate video call room ID
    const videoCallRoomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create booking
    const booking = new Booking({
      doctor: doctorId,
      user: userId,
      ticketPrice,
      timeSlot: slotId,
      appointmentDate: slot.date,
      appointmentTime: slot.startTime,
      videoCallRoomId,
      notes,
      status: "pending",
    });
    await booking.save();

    // Update slot
    slot.isBooked = true;
    slot.booking = booking._id;
    await slot.save();

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: { booking, videoCallRoomId },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a time slot
export const deleteTimeSlot = async (req, res) => {
  const { slotId } = req.params;
  const doctorId = req.userId;

  try {
    const slot = await TimeSlot.findOne({ _id: slotId, doctor: doctorId });
    
    if (!slot) {
      return res.status(404).json({ success: false, message: "Time slot not found" });
    }

    if (slot.isBooked) {
      return res.status(400).json({ success: false, message: "Cannot delete a booked slot" });
    }

    await TimeSlot.findByIdAndDelete(slotId);
    res.status(200).json({ success: true, message: "Time slot deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Generate recurring slots for a week
export const generateWeeklySlots = async (req, res) => {
  const doctorId = req.userId;
  const { schedule, startDate, weeksAhead = 4 } = req.body;
  // schedule: { 0: [{ startTime, endTime }], 1: [...], ... } for each day of week

  try {
    const createdSlots = [];
    const start = new Date(startDate);
    
    for (let week = 0; week < weeksAhead; week++) {
      for (let day = 0; day < 7; day++) {
        if (schedule[day] && schedule[day].length > 0) {
          const currentDate = new Date(start);
          currentDate.setDate(start.getDate() + (week * 7) + day);
          
          for (const slot of schedule[day]) {
            // Check if slot already exists
            const existing = await TimeSlot.findOne({
              doctor: doctorId,
              date: currentDate,
              startTime: slot.startTime,
            });

            if (!existing) {
              const newSlot = new TimeSlot({
                doctor: doctorId,
                date: currentDate,
                startTime: slot.startTime,
                endTime: slot.endTime,
                dayOfWeek: day,
                isRecurring: true,
              });
              await newSlot.save();
              createdSlots.push(newSlot);
            }
          }
        }
      }
    }

    res.status(201).json({
      success: true,
      message: `Created ${createdSlots.length} time slots`,
      data: createdSlots,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
