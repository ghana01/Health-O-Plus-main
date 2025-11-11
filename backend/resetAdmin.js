import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./db-models/UserSchema.js";
import dotenv from "dotenv";
dotenv.config();

const resetAdmin = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/MedLab');
    console.log("Connected to MongoDB");
    
    // Delete existing admin
    const deletedAdmin = await User.deleteOne({ email: "admin@healthoplus.com" });
    if (deletedAdmin.deletedCount > 0) {
      console.log("🗑️ Existing admin deleted");
    } else {
      console.log("ℹ️ No existing admin found");
    }
    
    // Create new admin with fresh password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("Admin@123", salt);
    
    const admin = await User.create({
      name: "Super Admin",
      email: "admin@healthoplus.com",
      password: hash,
      role: "admin"
    });
    
    console.log("✅ NEW ADMIN CREATED SUCCESSFULLY!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 Email: admin@healthoplus.com");
    console.log("🔐 Password: Admin@123");
    console.log("🌐 Login URL: http://localhost:3000/admin-login");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🎯 You can now login with these credentials!");
    
  } catch (error) {
    console.error("❌ Error resetting admin:", error);
  } finally {
    mongoose.connection.close();
  }
};

resetAdmin();