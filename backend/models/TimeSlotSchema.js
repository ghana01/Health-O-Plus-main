import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true, // e.g., "09:00"
    },
    endTime: {
      type: String,
      required: true, // e.g., "09:30"
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    booking: {
      type: mongoose.Types.ObjectId,
      ref: "Booking",
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
    dayOfWeek: {
      type: Number, // 0-6 (Sunday-Saturday)
    },
  },
  { timestamps: true }
);

// Index for efficient queries
timeSlotSchema.index({ doctor: 1, date: 1, startTime: 1 });

export default mongoose.models.TimeSlot || mongoose.model("TimeSlot", timeSlotSchema);
