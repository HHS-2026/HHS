
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const documentSchema = new Schema(
  {
    storageKey: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
      maxlength: 255,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const companySchema = new Schema(
  {
    // Link company profile to its login account
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      immutable: true,
    },

    // Company details
    legalName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    brandName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    website: {
      type: String,
      trim: true,
      maxlength: 255,
      default: "",
    },

    companyEmail: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 254,
      default: "",
    },

    country: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    businessAddress: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    businessPhone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },

    // Registration and supporting evidence
    registrationNumber: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    evidenceDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    evidenceFile: {
      type: documentSchema,
      default: null,
    },

    // Authorized applicant
    applicantName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    applicantTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    applicantIdentityEvidence: {
      type: documentSchema,
      default: null,
    },

    // Required declarations
    applicantAuthorized: {
      type: Boolean,
      required: true,
      validate: {
        validator: (value) => value === true,
        message: "Applicant authorization is required.",
      },
    },

    acceptEmployerPolicies: {
      type: Boolean,
      required: true,
      validate: {
        validator: (value) => value === true,
        message: "Employer policies must be accepted.",
      },
    },

    acceptAntiFraudRules: {
      type: Boolean,
      required: true,
      validate: {
        validator: (value) => value === true,
        message: "Anti-fraud rules must be accepted.",
      },
    },

    // Company verification
    verificationStatus: {
      type: String,
      enum: [
        "not_submitted",
        "pending",
        "under_review",
        "approved",
        "rejected",
      ],
      default: "not_submitted",
    },

    submittedAt: {
      type: Date,
      default: null,
    },

    reviewDeadline: {
      type: Date,
      default: null,
    },

    reviewedAt: {
      type: Date,
      default: null,
    },

    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    reviewNotes: {
      type: String,
      maxlength: 2000,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

companySchema.index({ verificationStatus: 1, submittedAt: 1 });

const Company = models.Company || model("Company", companySchema);

export default Company;
