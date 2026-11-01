
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

// Base upload directory
const uploadRoot = path.resolve("uploads/companies");

// Document directories
const registrationDir = path.join(
  uploadRoot,
  "registration-documents"
);

const identityDir = path.join(
  uploadRoot,
  "identity-documents"
);

// Create directories automatically
fs.mkdirSync(registrationDir, { recursive: true });
fs.mkdirSync(identityDir, { recursive: true });

// Allowed document formats
const allowedMimeTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

// Maximum file size: 5 MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Generate random filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "evidenceFile") {
      return cb(null, registrationDir);
    }

    if (file.fieldname === "applicantIdentityEvidence") {
      return cb(null, identityDir);
    }

    return cb(new Error("Invalid document field."));
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const randomName = crypto.randomUUID();

    cb(null, `${randomName}${extension}`);
  },
});

// Validate file types
const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new Error("Only PDF, JPG, JPEG and PNG files are allowed.")
    );
  }

  cb(null, true);
};

// Configure Multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 2,
  },
});

// Accept both company documents
export const uploadCompanyDocuments = upload.fields([
  { name: "evidenceFile", maxCount: 1 },
  { name: "applicantIdentityEvidence", maxCount: 1 },
]);
