import Prescription from "../models/PrescriptionSchema.js";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";

// Create a prescription (doctor only)
export const createPrescription = async (req, res) => {
  const doctorId = req.userId;
  const { patientId, bookingId, diagnosis, medicines, notes, validUntil } = req.body;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const patient = await User.findById(patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    const prescription = new Prescription({
      doctor: doctorId,
      patient: patientId,
      booking: bookingId,
      diagnosis,
      medicines,
      notes,
      validUntil: validUntil ? new Date(validUntil) : null,
    });

    await prescription.save();

    res.status(201).json({
      success: true,
      message: "Prescription created successfully",
      data: prescription,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get prescriptions for a patient
export const getPatientPrescriptions = async (req, res) => {
  const userId = req.userId;

  try {
    const prescriptions = await Prescription.find({ patient: userId })
      .populate("doctor", "name specialization photo")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: prescriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get prescriptions issued by a doctor
export const getDoctorPrescriptions = async (req, res) => {
  const doctorId = req.userId;
  const { patientId } = req.query;

  try {
    const query = { doctor: doctorId };
    if (patientId) {
      query.patient = patientId;
    }

    const prescriptions = await Prescription.find(query)
      .populate("patient", "name email photo")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: prescriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single prescription
export const getPrescription = async (req, res) => {
  const { prescriptionId } = req.params;

  try {
    const prescription = await Prescription.findById(prescriptionId)
      .populate("doctor", "name specialization photo email phone")
      .populate("patient", "name email phone");

    if (!prescription) {
      return res.status(404).json({ success: false, message: "Prescription not found" });
    }

    res.status(200).json({ success: true, data: prescription });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a prescription (doctor only)
export const updatePrescription = async (req, res) => {
  const doctorId = req.userId;
  const { prescriptionId } = req.params;
  const updates = req.body;

  try {
    const prescription = await Prescription.findOneAndUpdate(
      { _id: prescriptionId, doctor: doctorId },
      updates,
      { new: true }
    );

    if (!prescription) {
      return res.status(404).json({ success: false, message: "Prescription not found" });
    }

    res.status(200).json({
      success: true,
      message: "Prescription updated successfully",
      data: prescription,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a prescription (doctor only)
export const deletePrescription = async (req, res) => {
  const doctorId = req.userId;
  const { prescriptionId } = req.params;

  try {
    const prescription = await Prescription.findOneAndDelete({
      _id: prescriptionId,
      doctor: doctorId,
    });

    if (!prescription) {
      return res.status(404).json({ success: false, message: "Prescription not found" });
    }

    res.status(200).json({ success: true, message: "Prescription deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
