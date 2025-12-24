import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import {
  createMedicationReminder,
  getMedicationReminders,
  getTodaysMedications,
  updateMedicationReminder,
  toggleReminderStatus,
  deleteMedicationReminder,
} from "../Controllers/medicationReminderController.js";

const router = express.Router();

router.post("/", authenticate, restrict(["patient"]), createMedicationReminder);
router.get("/", authenticate, restrict(["patient"]), getMedicationReminders);
router.get("/today", authenticate, restrict(["patient"]), getTodaysMedications);
router.put("/:reminderId", authenticate, restrict(["patient"]), updateMedicationReminder);
router.patch("/:reminderId/toggle", authenticate, restrict(["patient"]), toggleReminderStatus);
router.delete("/:reminderId", authenticate, restrict(["patient"]), deleteMedicationReminder);

export default router;
