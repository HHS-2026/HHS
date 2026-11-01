
import fs from "fs/promises";
import path from "path";
import { fileTypeFromFile } from "file-type";

const allowedTypes = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
};

export const validateRecruiterDocuments = async (
  req,
  res,
  next
) => {
  const files = Object.values(req.files || {}).flat();

  try {
    for (const file of files) {
      const detectedType = await fileTypeFromFile(file.path);

      if (!detectedType) {
        throw new Error("Invalid or unsupported document.");
      }

      const allowedExtensions = allowedTypes[detectedType.mime];

      if (
        !allowedExtensions ||
        !allowedExtensions.includes(
          path.extname(file.originalname).toLowerCase()
        ) ||
        file.mimetype !== detectedType.mime
      ) {
        throw new Error(
          "Invalid document format. Only PDF, JPG, JPEG and PNG are allowed."
        );
      }
    }

    next();
  } catch (error) {
    await Promise.all(
      files.map((file) =>
        fs.unlink(file.path).catch(() => {})
      )
    );

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
