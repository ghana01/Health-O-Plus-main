import mongoose from "mongoose";
import User from "./db-models/UserSchema.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const testAdmin = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/MedLab');
    console.log("Connected to MongoDB");
    
    // Find the admin
    const admin = await User.findOne({ email: "admin@healthoplus.com" });
    
    if (admin) {
      console.log("✅ Admin found:");
      console.log("- Email:", admin.email);
      console.log("- Role:", admin.role);
      console.log("- Name:", admin.name);
      
      // Test password
      const testPassword = "Admin@123";
      const isMatch = await bcrypt.compare(testPassword, admin.password);
      console.log("- Password test with 'Admin@123':", isMatch ? "✅ MATCH" : "❌ NO MATCH");
      
      if (!isMatch) {
        console.log("🔧 Fixing password...");
        const salt = await bcrypt.genSalt(10);
        const newHash = await bcrypt.hash("Admin@123", salt);
        
        await User.updateOne(
          { email: "admin@healthoplus.com" },
          { password: newHash }
        );
        
        console.log("✅ Password updated! Try logging in again.");
      }
    } else {
      console.log("❌ No admin found in database");
    }
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.connection.close();
  }
};

testAdmin();