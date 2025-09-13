import express from "express";
import { uploadDocument } from "../Controllers/uploadController.js";
import { authenticate } from "../auth/verifyToken.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/document",
  authenticate,
  upload.single("document"),
  uploadDocument
);

export default router;
