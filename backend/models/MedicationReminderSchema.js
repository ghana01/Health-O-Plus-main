import mongoose from "mongoose";

const medicationReminderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medicineName: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      enum: ["once_daily", "twice_daily", "three_times_daily", "four_times_daily", "weekly", "as_needed"],
      required: true,
    },
    times: [{
      type: String, // e.g., "08:00", "14:00", "20:00"
      required: true,
    }],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    notes: {
      type: String,
    },
    prescription: {
      type: mongoose.Types.ObjectId,
      ref: "Prescription",
    },
  },
  { timestamps: true }
);

export default mongoose.models.MedicationReminder || mongoose.model("MedicationReminder", medicationReminderSchema);
