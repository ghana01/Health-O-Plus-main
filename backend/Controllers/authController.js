import User from "../db-models/UserSchema.js";
import Doctor from "../db-models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    "err54reg45765#%$#W",
    {
      expiresIn: "15d",
    }
  );
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role, city } = req.body;
    // Prevent admin registration via public signup
    if (role === 'admin') {
      return res.status(403).json({ message: 'Admin registration not allowed.' });
    }
    let user;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    if (role === 'doctor') {
      if (!city) {
        return res.status(400).json({ message: 'City is required for doctors' });
      }
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        role,
        city
      });
    } else {
      user = new User({
        name,
        email,
        password: hashPassword,
        role: role || 'patient'
      });
    }
    await user.save();
    res.status(200).json({ success: true, message: 'User successfully registered' });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Protected admin creation endpoint
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const admin = new User({
      name,
      email,
      password: hashPassword,
      role: 'admin'
    });
    await admin.save();
    res.status(200).json({ 
      success: true, 
      message: 'Admin successfully created',
      data: { name: admin.name, email: admin.email, role: admin.role }
    });
  } catch (error) {
    console.error("Admin creation error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = null;

    // Try to find user in User collection (patients and admins)
    user = await User.findOne({ email });

    // If not found in User collection, try to find in Doctor collection
    if (!user) {
      user = await Doctor.findOne({ email });
    }

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(404)
        .json({ status: false, message: "Invalid Credentials, try again" });
    }

    // Generate token
    const token = generateToken(user);
    const { password: userPassword, role, appointments, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: "Successfully login",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Failed to login" });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Admin login attempt for:", email);
    
    // Only look for admin users
    const user = await User.findOne({ 
      email, 
      role: 'admin' 
    });

    if (!user) {
      console.log("Admin not found with email:", email);
      return res.status(401).json({ 
        status: false, 
        message: "Invalid admin credentials or unauthorized access" 
      });
    }

    console.log("Admin found, comparing passwords...");
    
    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      console.log("Password mismatch for admin:", email);
      return res.status(401).json({ 
        status: false, 
        message: "Invalid admin credentials" 
      });
    }

    console.log("Admin login successful for:", email);
    
    // Generate token
    const token = generateToken(user);
    const { password: userPassword, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: "Admin login successful",
      token,
      data: { ...rest },
      role: user.role,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ 
      status: false, 
      message: "Admin login failed" 
    });
  }
};