import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Stripe from "stripe";
import { config } from "../config.js";

export const getCheckoutSession = async (req, res) => {
  try {
    if (!req.params.doctorId || !req.userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters"
      });
    }

    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.userId);

    if (!doctor || !user) {
      return res.status(404).json({
        success: false,
        message: "Doctor or user not found"
      });
    }

    const stripe = new Stripe(config.stripeSecretKey);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `http://localhost:5173/checkout-success`,
      cancel_url: `http://localhost:5173/doctors/${doctor._id}`,
      customer_email: user.email,
      client_reference_id: req.params.doctorId,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(doctor.ticketPrice * 100),
            product_data: {
              name: doctor.name,
              description: doctor.bio || "Medical consultation",
              images: doctor.photo ? [doctor.photo] : [],
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        doctorId: doctor._id.toString(),
        userId: user._id.toString()
      }
    });

    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice,
      session: session.id,
      status: "pending"
    });

    await booking.save();

    res.status(200).json({ 
      success: true, 
      message: "Checkout session created successfully", 
      session 
    });

  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(err.statusCode || 500).json({ 
      success: false, 
      message: err.message || "Error creating checkout session",
      error: {
        type: err.type,
        code: err.code,
        param: err.param,
        detail: err.detail
      }
    });
  }
};
