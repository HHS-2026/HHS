import { loginUser, registerUser, } from "../services/authService.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const result = await loginUser(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: result,
    });
  } catch (error) {
    if (
      error.message === "Invalid email or password." ||
      error.message ===
        "Too many failed attempts. Please try again later."
    ) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Your account is not active.") {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
};


export const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    // Required fields validation
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Public signup: sirf candidate ya company
    if (!["candidate", "company"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be candidate or company.",
      });
    }

    // Basic password validation
    if (password.length < 8 || password.length > 128) {
      return res.status(400).json({
        success: false,
        message: "Password must be between 8 and 128 characters.",
      });
    }

    const user = await registerUser(email, password, role);

    return res.status(201).json({
      success: true,
      message: "Account created successfully. Please log in.",
      data: { user },
    });
  } catch (error) {
    if (error.statusCode === 409 || error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    next(error);
  }
};
