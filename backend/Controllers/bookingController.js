import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

export const createBooking = async (req, res) => {
  try {
    if (!req.params.doctorId || !req.userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters"
      });
    }

    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.userId);

    if (!doctor || !user) {
      return res.status(404).json({
        success: false,
        message: "Doctor or user not found"
      });
    }

    const orderId = "ORDER_" + new Date().getTime();

    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice,
      orderId: orderId,
      status: "approved", // Set status to approved directly
      videoCallRoomId: orderId,
      isPaid: true // Assume it's paid
    });

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking created successfully",
      booking: booking
    });

  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({
      success: false,
      message: "Error creating booking",
      error: err.message
    });
  }
};