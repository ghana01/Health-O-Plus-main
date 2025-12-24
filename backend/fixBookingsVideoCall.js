// Run this script once to add videoCallRoomId to existing bookings
// Usage: node backend/fixBookingsVideoCall.js

import mongoose from "mongoose";
import Booking from "./models/BookingSchema.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/MedLab";

const fixBookings = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Find all bookings without videoCallRoomId
    const bookingsWithoutVideoId = await Booking.find({
      $or: [
        { videoCallRoomId: { $exists: false } },
        { videoCallRoomId: null },
        { videoCallRoomId: "" }
      ]
    });

    console.log(`Found ${bookingsWithoutVideoId.length} bookings without video call ID`);

    for (const booking of bookingsWithoutVideoId) {
      // Generate a video call room ID based on existing orderId or create new one
      const roomId = booking.orderId || `ROOM_${booking._id.toString()}`;
      booking.videoCallRoomId = roomId;
      await booking.save();
      console.log(`Updated booking ${booking._id} with videoCallRoomId: ${roomId}`);
    }

    console.log("All bookings updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error fixing bookings:", error);
    process.exit(1);
  }
};

fixBookings();
