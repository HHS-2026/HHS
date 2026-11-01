
import express from "express";

import {
  submitProfile,
  getMyProfile,
} from "../controllers/companyController.js";

import {
  protect,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

import {
  uploadCompanyDocuments,
} from "../middleware/companyUpload.js";

import {
  validateCompanyDocuments,
} from "../middleware/validateCompanyDocuments.js";

const router = express.Router();

// All company routes require authentication and company role
router.use(protect);
router.use(authorizeRoles("company"));

// Get logged-in company's profile
router.get("/me", getMyProfile);

// Submit company profile with legal documents
router.post(
  "/profile",
  uploadCompanyDocuments,
  validateCompanyDocuments,
  submitProfile
);

export default router;
