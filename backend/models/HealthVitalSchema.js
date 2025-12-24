import mongoose from "mongoose";

const healthVitalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["blood_pressure", "blood_sugar", "weight", "heart_rate", "temperature", "oxygen_level"],
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    // For blood pressure which has two values
    secondaryValue: {
      type: String,
    },
    notes: {
      type: String,
    },
    recordedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.HealthVital || mongoose.model("HealthVital", healthVitalSchema);
