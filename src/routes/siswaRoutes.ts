import express from "express";
import {
  getAllSiswa,
  getSiswaByNisn,
  createSiswa,
  updateSiswa,
  deleteSiswa,
  uploadQrCode,
} from "../controllers/siswaController";
import { upload } from "../middleware/upload";

const siswaRoutes = express.Router();

siswaRoutes.get("/", getAllSiswa);
siswaRoutes.get("/:nisn", getSiswaByNisn);
siswaRoutes.post("/", createSiswa);
siswaRoutes.put("/:nisn", updateSiswa);
siswaRoutes.delete("/:nisn", deleteSiswa);
siswaRoutes.post("/:nisn/upload", upload.single("qrcode_image"), uploadQrCode);

export default siswaRoutes;
