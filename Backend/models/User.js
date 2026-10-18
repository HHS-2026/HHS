
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const userSchema = new Schema(
  {
    // Login email
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },

    // Store only the hashed password, never the plain password
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },

    // Account type
    role: {
      type: String,
      enum: ["candidate", "company", "admin"],
      required: true,
      immutable: true,
    },

    // Account lifecycle
    accountStatus: {
      type: String,
      enum: ["active", "suspended", "deactivated"],
      default: "active",
    },

    // Email verification
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerifiedAt: {
      type: Date,
      default: null,
    },

    // Most recent successful login
    lastLoginAt: {
      type: Date,
      default: null,
    },

    // Failed login tracking
    failedLoginAttempts: {
      type: Number,
      default: 0,
      min: 0,
      select: false,
    },

    lockedUntil: {
      type: Date,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Email is unique, so MongoDB creates a unique index for it.
// Add only indexes that match actual query patterns.
userSchema.index({ role: 1, accountStatus: 1 });

const User = models.User || model("User", userSchema);

export default User;
