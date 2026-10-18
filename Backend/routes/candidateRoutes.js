
import { Router } from "express";

import {
  getMyCandidateProfile,
  saveCandidateProfile,
} from "../controllers/candidateController.js";

import {
  protect,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/me",
  protect,
  authorizeRoles("candidate"),
  getMyCandidateProfile
);

router.put(
  "/profile",
  protect,
  authorizeRoles("candidate"),
  saveCandidateProfile
);

export default router;
