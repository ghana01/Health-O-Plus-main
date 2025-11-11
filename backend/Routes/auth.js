import express from "express";
import { register, login, createAdmin, adminLogin } from "../Controllers/authController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin-login", adminLogin);

// Protected route for creating admins (only existing admins can create new admins)
router.post("/create-admin", authenticate, restrict(["admin"]), createAdmin);

export default router;
