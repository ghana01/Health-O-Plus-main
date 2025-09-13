import express from "express";
import { authenticate } from "./../auth/verifyToken.js";
import { createBooking } from "../Controllers/bookingController.js";

const router = express.Router();

router.post("/create-booking/:doctorId", authenticate, createBooking);

export default router;