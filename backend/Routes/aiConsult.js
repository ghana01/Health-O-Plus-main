import express from 'express';
import multer from 'multer';
import { chatConsultation, analyzeReport } from '../Controllers/aiConsultController.js';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Define routes
router.post('/chat', chatConsultation);
router.post('/analyze-report', upload.single('report'), analyzeReport);

export default router;