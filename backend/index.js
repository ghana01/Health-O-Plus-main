import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
import bookingRoute from "./Routes/booking.js";
import diseaseRoute from "./Routes/disease.js";
import adminRoute from "./Routes/admin.js";
import contactRoute from "./Routes/contact.js";
import forgotPassRoute from "./Routes/forgot-password.js";
import healthRoute from "./Routes/healthPredict.js";
import aiConsultRouter from './Routes/aiConsult.js';
import uploadRoute from './Routes/upload.js';
// New feature routes
import timeSlotRoute from './Routes/timeSlot.js';
import medicalRecordRoute from './Routes/medicalRecord.js';
import prescriptionRoute from './Routes/prescription.js';
import healthVitalRoute from './Routes/healthVital.js';
import medicationReminderRoute from './Routes/medicationReminder.js';
import emergencyContactRoute from './Routes/emergencyContact.js';
import { WebSocketServer } from "ws";
import http from "http";

dotenv.config();

const app = express();
const port = 8000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("Api is working");
});

//database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/MedLab', {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    console.log("Mongoose connected");
  } catch (error) {
    console.log("Mongoose connection failed");
  }
};

//middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors(corsOptions));
app.use("/api/v1/auth", authRoute); //domain/api/v1/auth/register or any other request
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/", diseaseRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/", contactRoute);
app.use("/api/v1/", forgotPassRoute);
app.use("/api/v1/", healthRoute);
app.use("/api/v1/upload", uploadRoute);
app.use("/api/ai-consult", aiConsultRouter); // Remove v1 from the path
// New feature routes
app.use("/api/v1/time-slots", timeSlotRoute);
app.use("/api/v1/medical-records", medicalRecordRoute);
app.use("/api/v1/prescriptions", prescriptionRoute);
app.use("/api/v1/health-vitals", healthVitalRoute);
app.use("/api/v1/medication-reminders", medicationReminderRoute);
app.use("/api/v1/emergency-contacts", emergencyContactRoute);

const server = http.createServer(app);

const wss = new WebSocketServer({ server }); 

const rooms = {};

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case "join":
        if (!rooms[data.roomId]) {
          rooms[data.roomId] = [];
        }
        rooms[data.roomId].push(ws);
        ws.roomId = data.roomId;
        console.log(`Client joined room ${data.roomId}`);
        break;
      case "offer":
      case "answer":
      case "ice-candidate":
        if (ws.roomId && rooms[ws.roomId]) {
          rooms[ws.roomId].forEach((client) => {
            if (client !== ws && client.readyState === ws.OPEN) {
              client.send(JSON.stringify(data));
            }
          });
        }
        break;
      case "chat-message":
        if (ws.roomId && rooms[ws.roomId]) {
          rooms[ws.roomId].forEach((client) => {
            if (client !== ws && client.readyState === ws.OPEN) {
              client.send(JSON.stringify(data));
            }
          });
        }
        break;
      default:
        break;
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    if (ws.roomId && rooms[ws.roomId]) {
      rooms[ws.roomId] = rooms[ws.roomId].filter((client) => client !== ws);
      if (rooms[ws.roomId].length === 0) {
        delete rooms[ws.roomId];
      }
    }
  });
});


server.listen(port, () => {
  connectDB();
  console.log("Server is running on port " + port);
});