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
    
    if (role === 'doctor') {
      if (!city) {
        return res.status(400).json({ message: 'City is required for doctors' });
      }
      user = new Doctor({
        name,
        email,
        password,
        role,
        city
      });
    } else {
      user = new User({
        name,
        email,
        password,
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

    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });
    const admin = await User.findOne({ email, role: "admin" }); // Add admin check

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }
    if (admin) {
      // Handle admin login
      user = admin;
    }

    //check if user exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(404)
        .json({ status: false, message: "Invalid Credentials, try again" });
    }

    // get token
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
