
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// 1. Candidate skills
const skillSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    proficiency: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Intermediate",
    },
    yearsOfExperience: {
      type: Number,
      min: 0,
      max: 60,
      default: 0,
    },
  },
  { _id: false }
);

// 2. Work experience
const experienceSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    employmentType: {
      type: String,
      enum: [
        "Full-time",
        "Part-time",
        "Contract",
        "Internship",
        "Freelance",
      ],
    },
    location: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 3000,
    },
  },
  { timestamps: false }
);

// 3. Education
const educationSchema = new Schema(
  {
    institution: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    degree: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    fieldOfStudy: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    startDate: Date,
    endDate: Date,
    isCurrent: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
  },
  { timestamps: false }
);

// 4. Languages
const languageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    proficiency: {
      type: String,
      enum: [
        "Basic",
        "Conversational",
        "Professional",
        "Fluent",
        "Native",
      ],
      default: "Conversational",
    },
  },
  { _id: false }
);

// 5. Candidate profile
const candidateSchema = new Schema(
  {
    // Link to the authentication account
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Personal information
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 25,
    },
    photo: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    // Professional profile
    headline: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 3000,
    },

    // Primary and custom job roles
    targetRole: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },
    customRole: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    preferredRoles: {
      type: [String],
      default: [],
      validate: {
        validator: (roles) => roles.length <= 20,
        message: "A maximum of 20 preferred roles is allowed.",
      },
    },

    // Location
    location: {
      country: {
        type: String,
        trim: true,
        maxlength: 100,
      },
      city: {
        type: String,
        trim: true,
        maxlength: 100,
      },
    },

    // External professional links
    links: {
      linkedIn: {
        type: String,
        trim: true,
        maxlength: 500,
      },
      portfolio: {
        type: String,
        trim: true,
        maxlength: 500,
      },
    },

    // Skills, experience and education
    skills: {
      type: [skillSchema],
      default: [],
      validate: {
        validator: (skills) => skills.length <= 100,
        message: "A maximum of 100 skills is allowed.",
      },
    },
    experience: {
      type: [experienceSchema],
      default: [],
      validate: {
        validator: (items) => items.length <= 50,
        message: "A maximum of 50 experience entries is allowed.",
      },
    },
    education: {
      type: [educationSchema],
      default: [],
      validate: {
        validator: (items) => items.length <= 30,
        message: "A maximum of 30 education entries is allowed.",
      },
    },
    languages: {
      type: [languageSchema],
      default: [],
      validate: {
        validator: (items) => items.length <= 30,
        message: "A maximum of 30 languages is allowed.",
      },
    },

    // Job preferences
    availability: {
      type: String,
      enum: [
        "Immediately",
        "Within 2 weeks",
        "Within a month",
        "Not looking",
      ],
      default: "Immediately",
    },
    workPreference: {
      type: String,
      enum: ["Remote", "On-site", "Hybrid", "Any"],
      default: "Any",
    },
    totalExperienceYears: {
      type: Number,
      min: 0,
      max: 60,
      default: 0,
    },
    expectedSalary: {
      amount: {
        type: Number,
        min: 0,
        max: 1000000000,
      },
      currency: {
        type: String,
        uppercase: true,
        trim: true,
        maxlength: 3,
        default: "PKR",
      },
      period: {
        type: String,
        enum: ["Monthly", "Yearly"],
        default: "Monthly",
      },
    },

    // Profile lifecycle
    profileStatus: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    profileVisibility: {
      type: String,
      enum: ["Public", "Private"],
      default: "Public",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 6. Indexes for common retrieval patterns

// One candidate profile per user
// The unique index is created by unique: true on the user field above.

// Candidate listing sorted newest first
candidateSchema.index({
  profileStatus: 1,
  profileVisibility: 1,
  createdAt: -1,
  _id: -1,
});

// Filter by country and city, then sort newest first
candidateSchema.index({
  "location.country": 1,
  "location.city": 1,
  profileStatus: 1,
  createdAt: -1,
  _id: -1,
});

// Search candidates by a specific skill
candidateSchema.index({
  "skills.name": 1,
  profileStatus: 1,
});

// Filter by desired job role
candidateSchema.index({
  preferredRoles: 1,
  profileStatus: 1,
});

const Candidate =
  models.Candidate || model("Candidate", candidateSchema);

export default Candidate;
