
import {
  submitCompanyProfile,
  getCompanyProfile,
} from "../services/companyService.js";

// Keep private storage paths out of API responses
const formatCompanyResponse = (company) => {
  const data = company.toObject();

  const formatDocument = (document) => {
    if (!document) return null;

    return {
      originalName: document.originalName,
      mimeType: document.mimeType,
      size: document.size,
    };
  };

  return {
    id: data._id,
    legalName: data.legalName,
    brandName: data.brandName,
    website: data.website,
    companyEmail: data.companyEmail,
    country: data.country,
    city: data.city,
    businessAddress: data.businessAddress,
    businessPhone: data.businessPhone,
    registrationNumber: data.registrationNumber,
    evidenceDescription: data.evidenceDescription,
    evidenceFile: formatDocument(data.evidenceFile),
    applicantName: data.applicantName,
    applicantTitle: data.applicantTitle,
    applicantIdentityEvidence: formatDocument(
      data.applicantIdentityEvidence
    ),
    verificationStatus: data.verificationStatus,
    submittedAt: data.submittedAt,
    reviewDeadline: data.reviewDeadline,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

// Submit company profile and documents
export const submitProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const company = await submitCompanyProfile(
      userId,
      req.body,
      req.files || {}
    );

    return res.status(201).json({
      success: true,
      message:
        "Your company application has been submitted successfully. HHS aims to review it within 3 days. Your company will be verified only after approval.",
      data: {
        company: formatCompanyResponse(company),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get logged-in company's profile
export const getMyProfile = async (req, res, next) => {
  try {
    const company = await getCompanyProfile(req.user.id);

    return res.status(200).json({
      success: true,
      data: {
        company: formatCompanyResponse(company),
      },
    });
  } catch (error) {
    next(error);
  }
};
