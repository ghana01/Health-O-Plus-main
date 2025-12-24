import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import {
  createTimeSlots,
  getAvailableSlots,
  getDoctorSlots,
  bookTimeSlot,
  deleteTimeSlot,
  generateWeeklySlots,
} from "../Controllers/timeSlotController.js";

const router = express.Router();

// Doctor routes
router.post("/", authenticate, restrict(["doctor"]), createTimeSlots);
router.get("/doctor", authenticate, restrict(["doctor"]), getDoctorSlots);
router.post("/weekly", authenticate, restrict(["doctor"]), generateWeeklySlots);
router.delete("/:slotId", authenticate, restrict(["doctor"]), deleteTimeSlot);

// Patient routes
router.get("/available", authenticate, getAvailableSlots);
router.post("/book", authenticate, restrict(["patient"]), bookTimeSlot);

export default router;
