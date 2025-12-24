import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import {
  addHealthVital,
  getHealthVitals,
  getVitalsChartData,
  getLatestVitals,
  deleteHealthVital,
  getHealthStats,
} from "../Controllers/healthVitalController.js";

const router = express.Router();

router.post("/", authenticate, restrict(["patient"]), addHealthVital);
router.get("/", authenticate, restrict(["patient"]), getHealthVitals);
router.get("/chart", authenticate, restrict(["patient"]), getVitalsChartData);
router.get("/latest", authenticate, restrict(["patient"]), getLatestVitals);
router.get("/stats", authenticate, restrict(["patient"]), getHealthStats);
router.delete("/:vitalId", authenticate, restrict(["patient"]), deleteHealthVital);

export default router;
