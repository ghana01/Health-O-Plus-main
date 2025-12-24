import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true }, // e.g., "twice daily", "once daily"
  duration: { type: String, required: true }, // e.g., "7 days", "2 weeks"
  instructions: { type: String }, // e.g., "take after meals"
});

const prescriptionSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patient: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    booking: {
      type: mongoose.Types.ObjectId,
      ref: "Booking",
    },
    diagnosis: {
      type: String,
      required: true,
    },
    medicines: [medicineSchema],
    notes: {
      type: String,
    },
    validUntil: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Prescription || mongoose.model("Prescription", prescriptionSchema);
