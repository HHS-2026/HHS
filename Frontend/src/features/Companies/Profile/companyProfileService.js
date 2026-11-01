
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ==========================================
// COMMON API REQUEST
// ==========================================

async function companyRequest(path, options = {}) {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("Please log in before submitting your application.");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  let result = {};

  try {
    result = await response.json();
  } catch {
    if (response.status !== 204) {
      throw new Error("The server returned an unreadable response.");
    }
  }

  if (!response.ok) {
    throw new Error(
      result.message || "Unable to complete your application."
    );
  }

  return result.data ?? result;
}

// ==========================================
// COMPANY FORM DATA
// ==========================================

function toFormData(values) {
  const formData = new FormData();

  const textFields = [
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

  textFields.forEach((key) => {
    const value = values[key];

    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const fileFields = [
    "evidenceFile",
    "applicantIdentityEvidence",
  ];

  fileFields.forEach((key) => {
    const file = values[key];

    if (file instanceof File) {
      formData.append(key, file);
    }
  });

  return formData;
}

// ==========================================
// RECRUITER FORM DATA
// ==========================================

function toRecruiterFormData(values) {
  const formData = new FormData();

  const textFields = [
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

  textFields.forEach((key) => {
    const value = values[key];

    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const fileFields = [
    "affiliationProof",
    "identityEvidence",
  ];

  fileFields.forEach((key) => {
    const file = values[key];

    if (file instanceof File) {
      formData.append(key, file);
    }
  });

  return formData;
}

// ==========================================
// COMPANY API FUNCTIONS
// ==========================================

// Get logged-in company's profile
export async function getCompanyProfile() {
  try {
    return await companyRequest("/api/companies/me");
  } catch (error) {
    if (error.message === "Company profile not found.") {
      return null;
    }

    throw error;
  }
}

// Save company profile
export function saveCompanyProfile(profile) {
  return companyRequest("/api/companies/profile", {
    method: "POST",
    body: toFormData(profile),
  });
}

// ==========================================
// RECRUITER API FUNCTIONS
// ==========================================

// Get all recruiter profiles
export function getRecruiterProfiles() {
  return companyRequest("/api/recruiters/me");
}

// Create new recruiter draft
export function saveRecruiterDraft(profile) {
  return companyRequest("/api/recruiters/profile", {
    method: "POST",
    body: toRecruiterFormData(profile),
  });
}

// Update existing recruiter draft
export function updateRecruiterDraft(recruiterId, profile) {
  return companyRequest(`/api/recruiters/profile/${recruiterId}`, {
    method: "PUT",
    body: toRecruiterFormData(profile),
  });
}

// Submit recruiter application for review
export function submitRecruiterApplication(recruiterId) {
  return companyRequest(`/api/recruiters/submit/${recruiterId}`, {
    method: "POST",
  });
}
