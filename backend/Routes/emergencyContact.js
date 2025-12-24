import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import {
  addEmergencyContact,
  getEmergencyContacts,
  getPrimaryEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
  getEmergencyServices,
} from "../Controllers/emergencyContactController.js";

const router = express.Router();

// Public route for emergency services
router.get("/services", getEmergencyServices);

// Protected routes for user's emergency contacts
router.post("/", authenticate, restrict(["patient"]), addEmergencyContact);
router.get("/", authenticate, restrict(["patient"]), getEmergencyContacts);
router.get("/primary", authenticate, restrict(["patient"]), getPrimaryEmergencyContact);
router.put("/:contactId", authenticate, restrict(["patient"]), updateEmergencyContact);
router.delete("/:contactId", authenticate, restrict(["patient"]), deleteEmergencyContact);

export default router;
