import express from "express";
import { authenticate, restrict } from "./../auth/verifyToken.js";
import { createBooking, cancelBooking, getBookingById } from "../Controllers/bookingController.js";

const router = express.Router();

router.post("/create-booking/:doctorId", authenticate, createBooking);
router.put("/cancel/:bookingId", authenticate, restrict(["patient"]), cancelBooking);
router.get("/:bookingId", authenticate, getBookingById);

export default router;