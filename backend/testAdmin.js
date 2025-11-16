import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./db-models/UserSchema.js";
import dotenv from "dotenv";
dotenv.config();

const testAdmin = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/MedLab');
    console.log("✅ Connected to MongoDB");
    
    // Find admin
    const admin = await User.findOne({ email: "admin@healthoplus.com" });
    
    if (!admin) {
      console.log("❌ No admin found! Creating new admin...");
      
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash("Admin@123", salt);
      
      const newAdmin = await User.create({
        name: "Super Admin",
        email: "admin@healthoplus.com",
        password: hash,
        role: "admin"
      });
      
      console.log("✅ NEW ADMIN CREATED!");
      console.log("📧 Email: admin@healthoplus.com");
      console.log("🔐 Password: Admin@123");
    } else {
      console.log("✅ Admin exists!");
      console.log("📧 Email:", admin.email);
      console.log("👤 Name:", admin.name);
      console.log("🔑 Role:", admin.role);
      
      // Test password
      const testPassword = "Admin@123";
      const isMatch = await bcrypt.compare(testPassword, admin.password);
      
      if (isMatch) {
        console.log("✅ Password 'Admin@123' is CORRECT!");
      } else {
        console.log("❌ Password 'Admin@123' is INCORRECT!");
        console.log("🔧 Updating password to 'Admin@123'...");
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash("Admin@123", salt);
        admin.password = hash;
        await admin.save();
        
        console.log("✅ Password updated successfully!");
      }
    }
    
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🌐 Login URL: http://localhost:3000/admin-login");
    console.log("📧 Email: admin@healthoplus.com");
    console.log("🔐 Password: Admin@123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    mongoose.connection.close();
  }
};

testAdmin();
