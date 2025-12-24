import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import {
  createPrescription,
  getPatientPrescriptions,
  getDoctorPrescriptions,
  getPrescription,
  updatePrescription,
  deletePrescription,
} from "../Controllers/prescriptionController.js";

const router = express.Router();

// Doctor routes
router.post("/", authenticate, restrict(["doctor"]), createPrescription);
router.get("/doctor", authenticate, restrict(["doctor"]), getDoctorPrescriptions);
router.put("/:prescriptionId", authenticate, restrict(["doctor"]), updatePrescription);
router.delete("/:prescriptionId", authenticate, restrict(["doctor"]), deletePrescription);

// Patient routes
router.get("/patient", authenticate, restrict(["patient"]), getPatientPrescriptions);

// Shared routes
router.get("/:prescriptionId", authenticate, getPrescription);

export default router;
