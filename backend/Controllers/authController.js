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
        role
      });
    }

    await user.save();
    res.status(200).json({ success: true, message: 'User successfully registered' });
    
  } catch (error) {
    console.error("Registration error:", error);
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