import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled", "completed"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    // New fields for scheduling
    timeSlot: {
      type: mongoose.Types.ObjectId,
      ref: "TimeSlot",
    },
    appointmentDate: {
      type: Date,
    },
    appointmentTime: {
      type: String, // e.g., "09:00"
    },
    videoCallRoomId: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "doctor",
    select: "name",
  });
  next();
});

export default mongoose.model("Booking", bookingSchema);
