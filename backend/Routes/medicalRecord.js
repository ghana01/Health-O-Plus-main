import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import {
  uploadMedicalRecord,
  getMedicalRecords,
  getMedicalRecord,
  deleteMedicalRecord,
  getMedicalRecordsSummary,
} from "../Controllers/medicalRecordController.js";

const router = express.Router();

router.post("/", authenticate, restrict(["patient"]), uploadMedicalRecord);
router.get("/", authenticate, restrict(["patient"]), getMedicalRecords);
router.get("/summary", authenticate, restrict(["patient"]), getMedicalRecordsSummary);
router.get("/:recordId", authenticate, restrict(["patient"]), getMedicalRecord);
router.delete("/:recordId", authenticate, restrict(["patient"]), deleteMedicalRecord);

export default router;
