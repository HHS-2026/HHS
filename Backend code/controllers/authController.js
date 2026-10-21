import { loginUser } from "../services/authService.js";

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