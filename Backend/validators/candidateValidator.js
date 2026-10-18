
const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const isOptionalString = (value) =>
  value === undefined ||
  value === null ||
  typeof value === "string";

const isValidArray = (value, maxLength) =>
  Array.isArray(value) && value.length <= maxLength;

const isValidUrl = (value) => {
  if (!isNonEmptyString(value)) return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const isValidEnum = (value, allowedValues) =>
  value === undefined ||
  value === null ||
  value === "" ||
  allowedValues.includes(value);

export const validateCandidateProfile = (data) => {
  const errors = [];

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return ["Request body must be a valid object."];
  }

  // 1. Personal information
  if (!isNonEmptyString(data.firstName)) {
    errors.push("First name is required.");
  } else if (data.firstName.trim().length > 60) {
    errors.push("First name cannot exceed 60 characters.");
  }

  if (!isNonEmptyString(data.lastName)) {
    errors.push("Last name is required.");
  } else if (data.lastName.trim().length > 60) {
    errors.push("Last name cannot exceed 60 characters.");
  }

  if (!isOptionalString(data.phone) || (data.phone?.length ?? 0) > 25) {
    errors.push("Phone must be a string of at most 25 characters.");
  }

  if (!isOptionalString(data.photo) || (data.photo?.length ?? 0) > 500) {
    errors.push("Photo URL must be a string of at most 500 characters.");
  }

  // 2. Professional profile
  if (!isOptionalString(data.headline) || (data.headline?.length ?? 0) > 160) {
    errors.push("Headline cannot exceed 160 characters.");
  }

  if (!isOptionalString(data.bio) || (data.bio?.length ?? 0) > 3000) {
    errors.push("Bio cannot exceed 3000 characters.");
  }

  if (
    !isOptionalString(data.targetRole) ||
    (data.targetRole?.length ?? 0) > 100
  ) {
    errors.push("Target role cannot exceed 100 characters.");
  }

  if (
    !isOptionalString(data.customRole) ||
    (data.customRole?.length ?? 0) > 100
  ) {
    errors.push("Custom role cannot exceed 100 characters.");
  }

  if (
    data.preferredRoles !== undefined &&
    (!isValidArray(data.preferredRoles, 20) ||
      !data.preferredRoles.every(
        (role) =>
          isNonEmptyString(role) &&
          role.trim().length <= 100
      ))
  ) {
    errors.push("Provide up to 20 valid preferred roles.");
  }

  // 3. Location
  if (data.location !== undefined) {
    if (
      !data.location ||
      typeof data.location !== "object" ||
      Array.isArray(data.location)
    ) {
      errors.push("Location must be an object.");
    } else {
      for (const field of ["country", "city"]) {
        const value = data.location[field];

        if (
          !isOptionalString(value) ||
          (value?.length ?? 0) > 100
        ) {
          errors.push(`${field} cannot exceed 100 characters.`);
        }
      }
    }
  }

  // 4. External links
  if (data.links !== undefined) {
    if (
      !data.links ||
      typeof data.links !== "object" ||
      Array.isArray(data.links)
    ) {
      errors.push("Links must be an object.");
    } else {
      for (const field of ["linkedIn", "portfolio"]) {
        const value = data.links[field];

        if (
          !isOptionalString(value) ||
          (value?.length ?? 0) > 500 ||
          !isValidUrl(value)
        ) {
          errors.push(`${field} must be a valid HTTP or HTTPS URL.`);
        }
      }
    }
  }

  // 5. Skills
  if (data.skills !== undefined) {
    const validProficiency = [
      "Beginner",
      "Intermediate",
      "Advanced",
      "Expert",
    ];

    if (!isValidArray(data.skills, 100)) {
      errors.push("Provide no more than 100 skills.");
    } else {
      data.skills.forEach((skill, index) => {
        if (!skill || typeof skill !== "object" || Array.isArray(skill)) {
          errors.push(`Skill ${index + 1} must be an object.`);
          return;
        }

        if (
          !isNonEmptyString(skill.name) ||
          skill.name.trim().length > 60
        ) {
          errors.push(`Skill ${index + 1} needs a valid name.`);
        }

        if (!isValidEnum(skill.proficiency, validProficiency)) {
          errors.push(`Skill ${index + 1} has invalid proficiency.`);
        }

        if (
          skill.yearsOfExperience !== undefined &&
          (!Number.isFinite(skill.yearsOfExperience) ||
            skill.yearsOfExperience < 0 ||
            skill.yearsOfExperience > 60)
        ) {
          errors.push(`Skill ${index + 1} has invalid years of experience.`);
        }
      });
    }
  }

  // 6. Work experience
  if (data.experience !== undefined) {
    const validEmploymentTypes = [
      "Full-time",
      "Part-time",
      "Contract",
      "Internship",
      "Freelance",
    ];

    if (!isValidArray(data.experience, 50)) {
      errors.push("Provide no more than 50 experience entries.");
    } else {
      data.experience.forEach((item, index) => {
        if (!item || typeof item !== "object" || Array.isArray(item)) {
          errors.push(`Experience ${index + 1} must be an object.`);
          return;
        }

        if (!isNonEmptyString(item.jobTitle) || item.jobTitle.trim().length > 100) {
          errors.push(`Experience ${index + 1} needs a valid job title.`);
        }

        if (!isNonEmptyString(item.companyName) || item.companyName.trim().length > 120) {
          errors.push(`Experience ${index + 1} needs a valid company name.`);
        }

        if (!isNonEmptyString(item.startDate) || Number.isNaN(Date.parse(item.startDate))) {
          errors.push(`Experience ${index + 1} needs a valid start date.`);
        }

        if (!isValidEnum(item.employmentType, validEmploymentTypes)) {
          errors.push(`Experience ${index + 1} has invalid employment type.`);
        }

        if (
          item.endDate != null &&
          item.endDate !== "" &&
          Number.isNaN(Date.parse(item.endDate))
        ) {
          errors.push(`Experience ${index + 1} has an invalid end date.`);
        }

        if (
          item.isCurrent !== undefined &&
          typeof item.isCurrent !== "boolean"
        ) {
          errors.push(`Experience ${index + 1} has an invalid current-job value.`);
        }

        if (
          !isOptionalString(item.location) ||
          (item.location?.length ?? 0) > 120
        ) {
          errors.push(`Experience ${index + 1} location is too long.`);
        }

        if (
          !isOptionalString(item.description) ||
          (item.description?.length ?? 0) > 3000
        ) {
          errors.push(`Experience ${index + 1} description is too long.`);
        }
      });
    }
  }

  // 7. Education
  if (data.education !== undefined) {
    if (!isValidArray(data.education, 30)) {
      errors.push("Provide no more than 30 education entries.");
    } else {
      data.education.forEach((item, index) => {
        if (!item || typeof item !== "object" || Array.isArray(item)) {
          errors.push(`Education ${index + 1} must be an object.`);
          return;
        }

        if (!isNonEmptyString(item.institution) || item.institution.trim().length > 150) {
          errors.push(`Education ${index + 1} needs a valid institution.`);
        }

        if (!isNonEmptyString(item.degree) || item.degree.trim().length > 120) {
          errors.push(`Education ${index + 1} needs a valid degree.`);
        }

        if (
          !isOptionalString(item.fieldOfStudy) ||
          (item.fieldOfStudy?.length ?? 0) > 120
        ) {
          errors.push(`Education ${index + 1} field of study is too long.`);
        }

        for (const field of ["startDate", "endDate"]) {
          const value = item[field];

          if (
            value != null &&
            value !== "" &&
            Number.isNaN(Date.parse(value))
          ) {
            errors.push(`Education ${index + 1} has an invalid ${field}.`);
          }
        }

        if (
          item.isCurrent !== undefined &&
          typeof item.isCurrent !== "boolean"
        ) {
          errors.push(`Education ${index + 1} has an invalid current-study value.`);
        }

        if (
          !isOptionalString(item.description) ||
          (item.description?.length ?? 0) > 2000
        ) {
          errors.push(`Education ${index + 1} description is too long.`);
        }
      });
    }
  }

  // 8. Languages
  if (data.languages !== undefined) {
    const validLanguageLevels = [
      "Basic",
      "Conversational",
      "Professional",
      "Fluent",
      "Native",
    ];

    if (!isValidArray(data.languages, 30)) {
      errors.push("Provide no more than 30 languages.");
    } else {
      data.languages.forEach((language, index) => {
        if (
          !language ||
          typeof language !== "object" ||
          Array.isArray(language)
        ) {
          errors.push(`Language ${index + 1} must be an object.`);
          return;
        }

        if (
          !isNonEmptyString(language.name) ||
          language.name.trim().length > 60
        ) {
          errors.push(`Language ${index + 1} needs a valid name.`);
        }

        if (!isValidEnum(language.proficiency, validLanguageLevels)) {
          errors.push(`Language ${index + 1} has invalid proficiency.`);
        }
      });
    }
  }

  // 9. Job preferences
  if (
    !isValidEnum(data.availability, [
      "Immediately",
      "Within 2 weeks",
      "Within a month",
      "Not looking",
    ])
  ) {
    errors.push("Invalid availability option.");
  }

  if (
    !isValidEnum(data.workPreference, [
      "Remote",
      "On-site",
      "Hybrid",
      "Any",
    ])
  ) {
    errors.push("Invalid work preference.");
  }

  if (
    data.totalExperienceYears !== undefined &&
    (!Number.isFinite(data.totalExperienceYears) ||
      data.totalExperienceYears < 0 ||
      data.totalExperienceYears > 60)
  ) {
    errors.push("Total experience must be between 0 and 60 years.");
  }

  // 10. Expected salary
  if (data.expectedSalary !== undefined) {
    const salary = data.expectedSalary;

    if (!salary || typeof salary !== "object" || Array.isArray(salary)) {
      errors.push("Expected salary must be an object.");
    } else {
      if (
        salary.amount !== undefined &&
        salary.amount !== null &&
        salary.amount !== "" &&
        (!Number.isFinite(salary.amount) ||
          salary.amount < 0 ||
          salary.amount > 1000000000)
      ) {
        errors.push("Expected salary amount is invalid.");
      }

      if (
        salary.currency !== undefined &&
        (!isNonEmptyString(salary.currency) ||
          salary.currency.trim().length > 3)
      ) {
        errors.push("Salary currency must contain up to 3 characters.");
      }

      if (!isValidEnum(salary.period, ["Monthly", "Yearly"])) {
        errors.push("Salary period must be Monthly or Yearly.");
      }
    }
  }

  return errors;
};
