
import Recruiter from "../models/Recruiter.js";
import Company from "../models/Company.js";

// Get company using authenticated company account
const getCompanyByUser = async (userId) => {
  const company = await Company.findOne({ user: userId });

  if (!company) {
    throw new Error("Company profile not found.");
  }

  return company;
};

// Get all recruiters belonging to the company
export const getRecruiterProfiles = async (userId) => {
  const company = await getCompanyByUser(userId);

  return Recruiter.find({ company: company._id })
    .populate("company", "legalName brandName verificationStatus")
    .sort({ createdAt: -1 });
};

// Get one recruiter belonging to the company
export const getRecruiterProfile = async (userId, recruiterId) => {
  const company = await getCompanyByUser(userId);

  return Recruiter.findOne({
    _id: recruiterId,
    company: company._id,
  }).populate("company", "legalName brandName verificationStatus");
};

// Create recruiter draft
export const saveRecruiterDraft = async (userId, profileData) => {
  const company = await getCompanyByUser(userId);

  const recruiter = await Recruiter.create({
    ...profileData,
    company: company._id,
    companyEmail: company.companyEmail,
    companyEmail: company.companyEmail,
    verificationStatus: "not_submitted",
  });

  return recruiter;
};

// Update recruiter draft
export const updateRecruiterDraft = async (
  userId,
  recruiterId,
  profileData
) => {
  const company = await getCompanyByUser(userId);

  const recruiter = await Recruiter.findOne({
    _id: recruiterId,
    company: company._id,
  });

  if (!recruiter) {
    throw new Error("Recruiter profile not found.");
  }

  if (
    ["pending", "under_review", "approved"].includes(
      recruiter.verificationStatus
    )
  ) {
    throw new Error("This recruiter profile cannot be edited.");
  }

 Object.assign(recruiter, profileData);

 

recruiter.companyEmail = company.companyEmail;

await recruiter.save();

  return recruiter;
};

// Submit recruiter application
export const submitRecruiterApplication = async (
  userId,
  recruiterId
) => {
  const company = await getCompanyByUser(userId);

  if (company.verificationStatus !== "approved") {
    throw new Error("Your company must be verified first.");
  }

  const recruiter = await Recruiter.findOne({
    _id: recruiterId,
    company: company._id,
  });

  if (!recruiter) {
    throw new Error("Recruiter profile not found.");
  }

  if (
    ["pending", "under_review", "approved"].includes(
      recruiter.verificationStatus
    )
  ) {
    throw new Error("Recruiter application is already submitted.");
  }

  const requiredFields = [
    recruiter.fullName,
    recruiter.email,
    recruiter.phone,
    recruiter.jobTitle,
    recruiter.companyEmail,
  ];

  if (requiredFields.some((field) => !field?.trim())) {
    throw new Error("Please complete all required recruiter fields.");
  }

  if (!recruiter.affiliationProof || !recruiter.identityEvidence) {
    throw new Error("Both required documents must be uploaded.");
  }

  if (
    !recruiter.administratorConfirmed ||
    !recruiter.acceptConductPolicy ||
    !recruiter.acceptPrivacyPolicy ||
    !recruiter.acceptAntiFraudRules
  ) {
    throw new Error("Please accept all required confirmations and policies.");
  }

  recruiter.verificationStatus = "pending";
  recruiter.submittedAt = new Date();

  await recruiter.save();

  return recruiter;
};
