import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const uploadRoot = path.resolve("uploads/recruiters");

const affiliationDir = path.join(
  uploadRoot,
  "affiliation-documents"
);

const identityDir = path.join(
  uploadRoot,
  "identity-documents"
);

fs.mkdirSync(affiliationDir, { recursive: true });
fs.mkdirSync(identityDir, { recursive: true });

const allowedMimeTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "affiliationProof") {
      return cb(null, affiliationDir);
    }

    if (file.fieldname === "identityEvidence") {
      return cb(null, identityDir);
    }

    return cb(new Error("Invalid recruiter document field."));
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `${crypto.randomUUID()}${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new Error("Only PDF, JPG, JPEG and PNG files are allowed.")
    );
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 2,
  },
});

export const uploadRecruiterDocuments = upload.fields([
  { name: "affiliationProof", maxCount: 1 },
  { name: "identityEvidence", maxCount: 1 },
]);