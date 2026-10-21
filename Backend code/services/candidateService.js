
import Candidate from "../models/Candidate.js";

const allowedProfileFields = [
  "firstName",
  "lastName",
  "phone",
  "photo",
  "headline",
  "bio",
  "targetRole",
  "customRole",
  "preferredRoles",
  "location",
  "links",
  "skills",
  "experience",
  "education",
  "languages",
  "availability",
  "workPreference",
  "totalExperienceYears",
  "expectedSalary",
];

const pickProfileFields = (data) => {
  const profileData = {};

  for (const field of allowedProfileFields) {
    if (Object.hasOwn(data, field)) {
      profileData[field] = data[field];
    }
  }

  return profileData;
};

export const getCandidateProfileByUserId = async (userId) => {
  return Candidate.findOne({ user: userId });
};

export const saveCandidateProfile = async (userId, data) => {
  const profileData = pickProfileFields(data);

  return Candidate.findOneAndUpdate(
    { user: userId },
    { $set: profileData },
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    }
  );
};
