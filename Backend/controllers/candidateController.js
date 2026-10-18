
import {
  validateCandidateProfile,
} from "../validators/candidateValidator.js";

import {
  getCandidateProfileByUserId,
  saveCandidateProfile as saveProfile,
} from "../services/candidateService.js";

export const getMyCandidateProfile = async (req, res, next) => {
  try {
    const candidate = await getCandidateProfileByUserId(req.user.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate profile not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: candidate,
    });
  } catch (error) {
    next(error);
  }
};

export const saveCandidateProfile = async (req, res, next) => {
  try {
    const errors = validateCandidateProfile(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Candidate profile validation failed.",
        errors,
      });
    }

    const candidate = await saveProfile(req.user.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Candidate profile saved successfully.",
      data: candidate,
    });
  } catch (error) {
    next(error);
  }
};
