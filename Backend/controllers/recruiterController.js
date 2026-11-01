
import path from "path";

import {
  getRecruiterProfiles,
  getRecruiterProfile,
  saveRecruiterDraft,
  updateRecruiterDraft,
  submitRecruiterApplication,
} from "../services/recruiterService.js";

// Uploaded file ka metadata prepare karna
const getDocumentData = (file) => {
  if (!file) return undefined;

  return {
    storageKey: path.relative(process.cwd(), file.path),
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
  };
};

// Allowed fields ko request body se extract karna
const getRecruiterFormData = (body = {}) => {
  const allowedFields = [
    "fullName",
    "email",
    "phone",
    "jobTitle",
    "responsibilities",
    "administratorName",
    "administratorEmail",
    "administratorConfirmed",
    "acceptConductPolicy",
    "acceptPrivacyPolicy",
    "acceptAntiFraudRules",
  ];

  const profileData = {};

  allowedFields.forEach((field) => {
    if (body[field] !== undefined) {
      profileData[field] = body[field];
    }
  });

  return profileData;
};

// Uploaded documents ko profile data mein add karna
const addRecruiterDocuments = (req, profileData) => {
  const affiliationProof = getDocumentData(
    req.files?.affiliationProof?.[0]
  );

  const identityEvidence = getDocumentData(
    req.files?.identityEvidence?.[0]
  );

  if (affiliationProof) {
    profileData.affiliationProof = affiliationProof;
  }

  if (identityEvidence) {
    profileData.identityEvidence = identityEvidence;
  }

  return profileData;
};

// GET /api/recruiters/me
export const getMyRecruiterProfiles = async (req, res, next) => {
  try {
    const recruiters = await getRecruiterProfiles(req.user.id);

    return res.status(200).json({
      success: true,
      results: recruiters.length,
      data: recruiters,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/recruiters/:id
export const getMyRecruiterProfile = async (req, res, next) => {
  try {
    const recruiter = await getRecruiterProfile(
      req.user.id,
      req.params.id
    );

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: recruiter,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/recruiters/profile
export const saveMyRecruiterDraft = async (req, res, next) => {
  try {
    const profileData = getRecruiterFormData(req.body);

    addRecruiterDocuments(req, profileData);

    const recruiter = await saveRecruiterDraft(
      req.user.id,
      profileData
    );

    return res.status(201).json({
      success: true,
      message: "Recruiter profile saved successfully.",
      data: recruiter,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/recruiters/profile/:id
export const updateMyRecruiterDraft = async (req, res, next) => {
  try {
    const profileData = getRecruiterFormData(req.body);

    addRecruiterDocuments(req, profileData);

    const recruiter = await updateRecruiterDraft(
      req.user.id,
      req.params.id,
      profileData
    );

    return res.status(200).json({
      success: true,
      message: "Recruiter profile updated successfully.",
      data: recruiter,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/recruiters/submit/:id
export const submitMyRecruiterApplication = async (req, res, next) => {
  try {
    const recruiter = await submitRecruiterApplication(
      req.user.id,
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Recruiter application submitted successfully.",
      data: recruiter,
    });
  } catch (error) {
    next(error);
  }
};
