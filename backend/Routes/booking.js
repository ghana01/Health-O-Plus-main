import express from "express";
import { authenticate, restrict } from "./../auth/verifyToken.js";
import { 
  createBooking, 
  cancelBooking, 
  getBookingById, 
  getDoctorBookings, 
  updateBookingStatus,
  checkVideoCallAccess 
} from "../Controllers/bookingController.js";

const router = express.Router();

router.post("/create-booking/:doctorId", authenticate, createBooking);
router.put("/cancel/:bookingId", authenticate, restrict(["patient"]), cancelBooking);
router.get("/doctor-bookings", authenticate, restrict(["doctor"]), getDoctorBookings);
router.get("/check-video-access/:bookingId", authenticate, checkVideoCallAccess);
router.patch("/:bookingId/status", authenticate, restrict(["doctor"]), updateBookingStatus);
router.get("/:bookingId", authenticate, getBookingById);

export default router;