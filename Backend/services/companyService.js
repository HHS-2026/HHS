
import Company from "../models/Company.js";
import fs from "fs/promises";
import path from "path";

const allowedCompanyFields = [
  "legalName",
  "brandName",
  "website",
  "companyEmail",
  "country",
  "city",
  "businessAddress",
  "businessPhone",
  "registrationNumber",
  "evidenceDescription",
  "applicantName",
  "applicantTitle",
  "applicantAuthorized",
  "acceptEmployerPolicies",
  "acceptAntiFraudRules",
];

// Convert uploaded file information into database metadata
const createDocumentData = (file) => {
  if (!file) return undefined;

  return {
    storageKey: path
      .relative(process.cwd(), file.path)
      .split(path.sep)
      .join("/"),

    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
  };
};

// Delete files uploaded during a failed request
const deleteUploadedFiles = async (files = []) => {
  await Promise.all(
    files.map(async (file) => {
      try {
        await fs.unlink(file.path);
      } catch (error) {
        if (error.code !== "ENOENT") {
          console.error("Uploaded file cleanup failed:", error.message);
        }
      }
    })
  );
};

export const submitCompanyProfile = async (
  userId,
  profileData,
  uploadedFiles = {}
) => {
  const newFiles = Object.values(uploadedFiles).flat();

  let company;

  try {
    company = await Company.findOne({ user: userId });

    if (
      company &&
      ["pending", "under_review", "approved"].includes(
        company.verificationStatus
      )
    ) {
      const error = new Error(
        "Your company application is already submitted or approved."
      );
      error.statusCode = 409;
      throw error;
    }

    // Only accept fields defined in the company profile schema
    const cleanData = {};

    for (const field of allowedCompanyFields) {
      if (profileData[field] !== undefined) {
        cleanData[field] = profileData[field];
      }
    }

    // Preserve old documents when a rejected application is resubmitted
    const registrationDocument = uploadedFiles.evidenceFile?.[0];
    const identityDocument =
      uploadedFiles.applicantIdentityEvidence?.[0];

    if (!company && (!registrationDocument || !identityDocument)) {
      const error = new Error(
        "Both company registration and applicant identity documents are required."
      );
      error.statusCode = 400;
      throw error;
    }

    if (registrationDocument) {
      cleanData.evidenceFile =
        createDocumentData(registrationDocument);
    }

    if (identityDocument) {
      cleanData.applicantIdentityEvidence =
        createDocumentData(identityDocument);
    }

    const submittedAt = new Date();
    const reviewDeadline = new Date(
      submittedAt.getTime() + 3 * 24 * 60 * 60 * 1000
    );

    if (!company) {
      company = new Company({
        user: userId,
        ...cleanData,
        verificationStatus: "pending",
        submittedAt,
        reviewDeadline,
      });
    } else {
      // Only rejected applications can reach this update branch
      Object.assign(company, cleanData);

      company.verificationStatus = "pending";
      company.submittedAt = submittedAt;
      company.reviewDeadline = reviewDeadline;
      company.reviewedAt = null;
      company.reviewedBy = null;
      company.reviewNotes = "";
    }

    await company.save();

    // Remove replaced old documents only after successful DB save
    const oldDocuments = [];

    if (registrationDocument && company.isNew === false) {
      // Old document cleanup is handled separately in the next improvement
      // to avoid deleting a document before its replacement is saved.
    }

    return company;
  } catch (error) {
    await deleteUploadedFiles(newFiles);
    throw error;
  }
};

export const getCompanyProfile = async (userId) => {
  const company = await Company.findOne({ user: userId });

  if (!company) {
    const error = new Error("Company profile not found.");
    error.statusCode = 404;
    throw error;
  }

  return company;
};
