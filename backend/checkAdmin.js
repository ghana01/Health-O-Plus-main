import mongoose from "mongoose";
import User from "./db-models/UserSchema.js";
import dotenv from "dotenv";
dotenv.config();

const checkAdmin = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/MedLab');
    console.log("Connected to MongoDB");
    
    const admin = await User.findOne({ role: "admin" });
    
    if (admin) {
      console.log("🎯 ADMIN FOUND IN DATABASE:");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("📧 Email:", admin.email);
      console.log("👤 Name:", admin.name);
      console.log("🔐 Password to use: Admin@123");
      console.log("🌐 Login URL: http://localhost:3000/admin-login");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("✅ You can login with these credentials!");
    } else {
      console.log("❌ No admin found in database");
      console.log("🔧 Run 'npm run seed-admin' to create admin");
    }
    
  } catch (error) {
    console.error("❌ Error checking admin:", error);
  } finally {
    mongoose.connection.close();
    process.exit();
  }
};

checkAdmin();