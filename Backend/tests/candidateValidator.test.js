
import assert from "node:assert/strict";
import { validateCandidateProfile } from "../validators/candidateValidator.js";

// Test 1: Valid candidate profile
const validProfile = {
  firstName: "Kanwal",
  lastName: "Shakeel",
  targetRole: "MERN Stack Developer",
  customRole: "",
  location: {
    country: "Pakistan",
    city: "Islamabad",
  },
  links: {
    linkedIn: "https://www.linkedin.com/",
    portfolio: "https://example.com/",
  },
  skills: [
    {
      name: "React.js",
      proficiency: "Advanced",
      yearsOfExperience: 2,
    },
  ],
  experience: [],
  education: [],
  languages: [
    {
      name: "English",
      proficiency: "Professional",
    },
  ],
  availability: "Immediately",
  workPreference: "Remote",
  totalExperienceYears: 0,
  expectedSalary: {
    amount: 50000,
    currency: "PKR",
    period: "Monthly",
  },
};

const validErrors = validateCandidateProfile(validProfile);

assert.deepEqual(validErrors, []);
console.log("✅ Test 1 passed: Valid profile accepted.");

// Test 2: Missing first name
const missingNameProfile = {
  ...validProfile,
  firstName: "",
};

const nameErrors = validateCandidateProfile(missingNameProfile);

assert.ok(
  nameErrors.some((error) => error.includes("First name is required"))
);
console.log("✅ Test 2 passed: Missing first name rejected.");

// Test 3: Invalid LinkedIn URL
const invalidUrlProfile = {
  ...validProfile,
  links: {
    linkedIn: "not-a-valid-url",
    portfolio: "https://example.com/",
  },
};

const urlErrors = validateCandidateProfile(invalidUrlProfile);

assert.ok(
  urlErrors.some((error) => error.includes("linkedIn"))
);
console.log("✅ Test 3 passed: Invalid URL rejected.");

// Test 4: Invalid skill proficiency
const invalidSkillProfile = {
  ...validProfile,
  skills: [
    {
      name: "React.js",
      proficiency: "Super Expert",
      yearsOfExperience: 2,
    },
  ],
};

const skillErrors = validateCandidateProfile(invalidSkillProfile);

assert.ok(
  skillErrors.some((error) => error.includes("invalid proficiency"))
);
console.log("✅ Test 4 passed: Invalid skill proficiency rejected.");

// Test 5: Too many preferred roles
const invalidRolesProfile = {
  ...validProfile,
  preferredRoles: Array(21).fill("Developer"),
};

const roleErrors = validateCandidateProfile(invalidRolesProfile);

assert.ok(
  roleErrors.some((error) => error.includes("preferred roles"))
);
console.log("✅ Test 5 passed: More than 20 preferred roles rejected.");

console.log("\n🎉 All candidate validator tests passed!");
