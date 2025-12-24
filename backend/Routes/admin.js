import express from "express";
import { authenticate, restrict } from "./../auth/verifyToken.js";
import {
  getAllUsers,
  getAllDoctors,
  getAllBookings,
  deleteUserById,
  deleteDoctorById,
  updateDoctorApprovalStatus,
  getUserById,
  updateUserById,
} from "../Controllers/adminController.js";

const router = express.Router();

// User routes
router.route("/users").get(authenticate, restrict(["admin"]), getAllUsers);
router.route("/users/:id").get(authenticate, restrict(["admin"]), getUserById);
router.route("/users/:id").put(authenticate, restrict(["admin"]), updateUserById);
router.delete(
  "/users/delete/:id",
  authenticate,
  restrict(["admin"]),
  deleteUserById
);

// Doctor routes
router.delete(
  "/doctors/delete/:id",
  authenticate,
  restrict(["admin"]),
  deleteDoctorById
);

router.route("/doctors").get(authenticate, restrict(["admin"]), getAllDoctors);
router
  .route("/doctors/:id")
  .put(authenticate, restrict(["admin"]), updateDoctorApprovalStatus);

// Booking routes
router
  .route("/bookings")
  .get(authenticate, restrict(["admin"]), getAllBookings);

export default router;
