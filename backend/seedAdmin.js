import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./db-models/UserSchema.js";
import dotenv from "dotenv";
dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/MedLab');
    console.log("Connected to MongoDB");
    
    const existing = await User.findOne({ email: "admin@healthoplus.com" });
    if (existing) {
      console.log("Admin already exists: admin@healthoplus.com");
      console.log("🔐 Use Password: Admin@123");
      console.log("🌐 Login URL: http://localhost:3000/admin-login");
      mongoose.connection.close();
      return;
    }
    
    // Use salt for better security
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("Admin@123", salt);
    
    const admin = await User.create({
      name: "Super Admin",
      email: "admin@healthoplus.com",
      password: hash,
      role: "admin"
    });
    
    console.log("✅ Admin seeded successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 Email: admin@healthoplus.com");
    console.log("🔐 Password: Admin@123");
    console.log("🌐 Access via: /admin-login");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin();