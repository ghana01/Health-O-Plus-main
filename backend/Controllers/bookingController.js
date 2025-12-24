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

// Cancel booking by patient
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }
    
    // Check if the user owns this booking
    if (booking.user.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this booking"
      });
    }
    
    // Check if already cancelled or completed
    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled"
      });
    }
    
    if (booking.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel a completed appointment"
      });
    }
    
    booking.status = "cancelled";
    await booking.save();
    
    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking
    });
  } catch (err) {
    console.error("Cancel Booking Error:", err);
    res.status(500).json({
      success: false,
      message: "Error cancelling booking",
      error: err.message
    });
  }
};

// Get single booking
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate("doctor", "name email photo specialization")
      .populate("user", "name email photo");
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching booking",
      error: err.message
    });
  }
};