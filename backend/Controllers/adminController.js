import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "Users Found",
      data: users,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No Users found",
    });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    // Log received user ID
    console.log("Received User ID:", id);

    const deletedUser = await User.findByIdAndDelete(id); // Find and delete user by ID
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const deleteDoctorById = async (req, res) => {
  try {
    const id = req.params.id;
    // Log received user ID
    console.log("Received User ID:", id);

    const deletedUser = await Doctor.findByIdAndDelete(id); // Find and delete user by ID
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "Doctors Found",
      data: doctors,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No Doctors found",
    });
  }
};
export const getAllBookings = async (req, res) => {
  try {
    // Populate user and doctor data for bookings
    const bookings = await Booking.find({})
      .populate('user', 'name email photo')
      .populate('doctor', 'name specialization photo');

    res.status(200).json({
      counts: bookings.length,
      success: true,
      message: "Bookings Found",
      data: bookings,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No Bookings Found",
    });
  }
};

export const updateDoctorApprovalStatus = async (req, res) => {
  const { id } = req.params;
  const { isApproved } = req.body;

  if (!["pending", "approved", "cancelled"].includes(isApproved)) {
    return res.status(400).json({ message: "Invalid approval status" });
  }

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.isApproved = isApproved;
    await doctor.save();

    res
      .status(200)
      .json({ message: "Approval status updated successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get single user by ID for admin
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: err.message,
    });
  }
};

// Update user by ID for admin
export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, gender, role, bloodType, photo } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        gender,
        role,
        bloodType,
        photo,
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: err.message,
    });
  }
};
