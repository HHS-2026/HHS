import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const loginUser = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();

  // Password aur security fields explicitly select karna
  const user = await User.findOne({
    email: normalizedEmail,
  }).select("+password +failedLoginAttempts +lockedUntil");

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // Check whether the account is temporarily locked
  if (user.lockedUntil && user.lockedUntil > new Date()) {
    throw new Error("Too many failed attempts. Please try again later.");
  }

  // Expired lock ko clear karna
  if (user.lockedUntil && user.lockedUntil <= new Date()) {
    user.lockedUntil = null;
    user.failedLoginAttempts = 0;
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    user.failedLoginAttempts += 1;

    if (user.failedLoginAttempts >= 5) {
      user.lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
    }

    await user.save();

    throw new Error("Invalid email or password.");
  }

  if (user.accountStatus !== "active") {
    throw new Error("Your account is not active.");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("Authentication configuration error.");
  }

  // Successful login: reset failed attempts
  user.failedLoginAttempts = 0;
  user.lockedUntil = null;
  user.lastLoginAt = new Date();

  await user.save();

  // JWT claim "id" matches your existing authMiddleware
  const token = jwt.sign(
    { id: user._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

  return {
    token,
    user: {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    },
  };
};