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

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please login again."
      });
    }

    // Get appointmentDate and appointmentTime from request body
    const { appointmentDate, appointmentTime, notes } = req.body;

    const orderId = "ORDER_" + new Date().getTime();

    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice || "0", // Default to "0" if not set
      orderId: orderId,
      status: "approved", // Set status to approved directly - no admin approval needed
      videoCallRoomId: orderId,
      isPaid: true, // Assume it's paid
      appointmentDate: appointmentDate || new Date(), // Default to today if not provided
      appointmentTime: appointmentTime || "10:00", // Default time if not provided
      notes: notes || ""
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

// Get all bookings for a doctor
export const getDoctorBookings = async (req, res) => {
  try {
    const doctorId = req.doctorId;
    
    const bookings = await Booking.find({ doctor: doctorId })
      .populate("user", "name email photo gender")
      .populate("doctor", "name email photo specialization")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching doctor bookings",
      error: err.message
    });
  }
};

// Update booking status (for doctor to mark as completed)
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    
    const validStatuses = ["pending", "approved", "cancelled", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }
    
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }
    
    booking.status = status;
    await booking.save();
    
    res.status(200).json({
      success: true,
      message: `Booking ${status} successfully`,
      data: booking
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating booking status",
      error: err.message
    });
  }
};

// Check if video call is accessible based on appointment time
export const checkVideoCallAccess = async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    const booking = await Booking.findById(bookingId)
      .populate("doctor", "name")
      .populate("user", "name");
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }
    
    // Check if booking is approved
    if (booking.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "This appointment is not approved",
        isAccessible: false
      });
    }
    
    // Check if current time is within the appointment window
    const now = new Date();
    const appointmentDate = new Date(booking.appointmentDate);
    
    // Parse appointment time (format: "HH:MM")
    const [hours, minutes] = (booking.appointmentTime || "00:00").split(":").map(Number);
    appointmentDate.setHours(hours, minutes, 0, 0);
    
    // Allow access 5 minutes before appointment time and up to 1 hour after
    const startWindow = new Date(appointmentDate.getTime() - 5 * 60 * 1000); // 5 minutes before
    const endWindow = new Date(appointmentDate.getTime() + 60 * 60 * 1000); // 1 hour after
    
    const isAccessible = now >= startWindow && now <= endWindow;
    
    res.status(200).json({
      success: true,
      isAccessible,
      appointmentDate: booking.appointmentDate,
      appointmentTime: booking.appointmentTime,
      videoCallRoomId: isAccessible ? booking.videoCallRoomId : null,
      message: isAccessible 
        ? "Video call is accessible" 
        : `Video call will be available at ${booking.appointmentTime} on ${new Date(booking.appointmentDate).toLocaleDateString()}`
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error checking video call access",
      error: err.message
    });
  }
};