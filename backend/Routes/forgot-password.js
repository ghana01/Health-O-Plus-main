import nodemailer from "nodemailer";
import dotEnv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/UserSchema.js";
const router = express.Router();
dotEnv.config();

// Get frontend URL from environment variable
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// POST route for form submission
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.send({ status: "User not exists." });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY || "JWT_secret_key", {
      expiresIn: "1d",
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASS,
      },
    });
    const mailOptions = {
      from: {
        name: "Health-O-Plus",
        user: process.env.EMAIL_USER,
      },
      to: email,
      subject: "Reset Your Password - Health-O-Plus",
      text: `Click the link to reset your password: ${FRONTEND_URL}/reset-password/${user._id}/${token}`,
      html: `<p>Click <a href="${FRONTEND_URL}/reset-password/${user._id}/${token}">here</a> to reset your password.</p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).json({ message: "Failed to send email" });
      } else {
        res.status(200).json({ message: "Success" });
      }
    });
  });
});

router.post("/reset-password/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, process.env.JWT_SECRET_KEY || "JWT_secret_key", (err, decoded) => {
    if (err) {
      return res.json({ message: "Error with token" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.findOneAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ message: "Success" }))
            .catch((err) => res.send({ message: err }));
        })
        .catch((err) => res.send({ message: err }));
    }
  });
});

export default router;
