import multer, { StorageEngine, FileFilterCallback } from "multer";
import path from "path";

// Konfigurasi penyimpanan file
const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    // Simpan file di folder "uploads/"
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const { nisn } = req.params; // Ambil NISN dari URL params
    if (!nisn) {
      return cb(new Error("NISN is required in the URL"), ""); // Jika tidak ada NISN, error
    }

    const ext = path.extname(file.originalname); // Ambil ekstensi file
    const filename = `${nisn}${ext}`; // Nama file berdasarkan NISN

    cb(null, filename); // Set filename
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
