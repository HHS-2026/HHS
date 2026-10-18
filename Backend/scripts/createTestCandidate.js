import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";

import User from "../models/User.js";

const createTestCandidate = async () => {
  try {
    // Apni .env mein jo MongoDB URI variable hai,
    // usi ka naam yahan use karna.
    await mongoose.connect(process.env.MONGODB_URI);

    const email = "testcandidate@example.com";

    let user = await User.findOne({ email });

    if (!user) {
      const hashedPassword = await bcrypt.hash(
        "TestPassword123!",
        12
      );

      user = await User.create({
        email,
        password: hashedPassword,
        role: "candidate",
        accountStatus: "active",
      });
    }

    console.log("Test candidate user ID:", user._id.toString());
    console.log("Test candidate email:", user.email);
  } catch (error) {
    console.error("Test user creation failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

createTestCandidate();