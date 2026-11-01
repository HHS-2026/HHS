import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
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

const recruiterSchema = new mongoose.Schema(
  {
 
    // Recruiter's personal information
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    responsibilities: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    // Company association
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    companyEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

   affiliationProof: {
  type: documentSchema,
  default: null,
},
    // Administrator information
    administratorName: {
      type: String,
      trim: true,
      default: "",
    },

    administratorEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    administratorConfirmed: {
      type: Boolean,
      default: false,
    },

    // Identity document
    identityEvidence: {
  type: documentSchema,
  default: null,
},

    // Required consents
    acceptConductPolicy: {
      type: Boolean,
      default: false,
    },

    acceptPrivacyPolicy: {
      type: Boolean,
      default: false,
    },

    acceptAntiFraudRules: {
      type: Boolean,
      default: false,
    },

    // Application workflow
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

    reviewedAt: {
      type: Date,
      default: null,
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    reviewNotes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const Recruiter =
  mongoose.models.Recruiter ||
  mongoose.model("Recruiter", recruiterSchema);

export default Recruiter;