


// middleware/upload.js
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Using memory storage for Cloudinary uploads
const storage = multer.memoryStorage();

// ✅ Define and export the configured multer instance
const upload = multer({ storage });

export default upload;
