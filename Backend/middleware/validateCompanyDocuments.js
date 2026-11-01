
import { fileTypeFromFile } from "file-type";
import fs from "fs/promises";
import path from "path";

const allowedTypes = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
};

// Delete uploaded files if validation fails
const cleanupFiles = async (files = {}) => {
  const allFiles = Object.values(files).flat();

  await Promise.all(
    allFiles.map(async (file) => {
      try {
        await fs.unlink(file.path);
      } catch (error) {
        if (error.code !== "ENOENT") {
          console.error("File cleanup failed:", error.message);
        }
      }
    })
  );
};

export const validateCompanyDocuments = async (
  req,
  res,
  next
) => {
  try {
    const files = req.files || {};
    const allFiles = Object.values(files).flat();

    for (const file of allFiles) {
      // Detect actual file format using file signatures
      const detectedType = await fileTypeFromFile(file.path);

      if (!detectedType) {
        const error = new Error(
          "Invalid or unsupported document file."
        );
        error.statusCode = 400;
        throw error;
      }

      const allowedExtensions =
        allowedTypes[detectedType.mime];

      if (!allowedExtensions) {
        const error = new Error(
          "Only PDF, JPG, JPEG and PNG documents are allowed."
        );
        error.statusCode = 400;
        throw error;
      }

      // Check actual format against uploaded MIME type
      if (file.mimetype !== detectedType.mime) {
        const error = new Error(
          "Document content does not match its declared file type."
        );
        error.statusCode = 400;
        throw error;
      }

      // Check actual format against filename extension
      const originalExtension = path
        .extname(file.originalname)
        .toLowerCase();

      if (!allowedExtensions.includes(originalExtension)) {
        const error = new Error(
          "Document extension does not match its actual format."
        );
        error.statusCode = 400;
        throw error;
      }
    }

    next();
  } catch (error) {
    await cleanupFiles(req.files);

    error.statusCode = error.statusCode || 400;
    next(error);
  }
};
