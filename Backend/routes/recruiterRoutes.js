
import express from "express";

import {
  getMyRecruiterProfiles,
  getMyRecruiterProfile,
  saveMyRecruiterDraft,
  updateMyRecruiterDraft,
  submitMyRecruiterApplication,
} from "../controllers/recruiterController.js";

import {
  protect,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

import {
  uploadRecruiterDocuments,
} from "../middleware/recruiterUploadMiddleware.js";

import {
  validateRecruiterDocuments,
} from "../middleware/validateRecruiterDocuments.js";

const router = express.Router();

// All recruiter routes require company authentication
router.use(protect);
router.use(authorizeRoles("company"));

// Get all recruiters belonging to logged-in company
router.get("/me", getMyRecruiterProfiles);

// Get one recruiter profile
router.get("/:id", getMyRecruiterProfile);

router.post(
  "/profile",
  uploadRecruiterDocuments,
  validateRecruiterDocuments,
  saveMyRecruiterDraft
);

router.put(
  "/profile/:id",
  uploadRecruiterDocuments,
  validateRecruiterDocuments,
  updateMyRecruiterDraft
);

// Submit recruiter application for verification
router.post("/submit/:id", submitMyRecruiterApplication);

export default router;
