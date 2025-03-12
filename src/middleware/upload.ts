import multer, { StorageEngine, FileFilterCallback } from "multer";
import path from "path";

// Konfigurasi penyimpanan file
const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Simpan file di folder "uploads/"
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Nama unik
  },
});

// Filter hanya untuk file gambar
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

// Middleware multer
export const upload = multer({ storage, fileFilter });
