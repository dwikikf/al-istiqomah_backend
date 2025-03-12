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
import { authMiddleware } from "../middleware/authMiddleware";

const siswaRoutes = express.Router();

siswaRoutes.get("/", authMiddleware, getAllSiswa);
siswaRoutes.get("/:nisn", authMiddleware, getSiswaByNisn);
siswaRoutes.post("/", authMiddleware, createSiswa);
siswaRoutes.put("/:nisn", authMiddleware, updateSiswa);
siswaRoutes.delete("/:nisn", authMiddleware, deleteSiswa);
siswaRoutes.post(
  "/:nisn/upload",
  authMiddleware,
  upload.single("qrcode_image"),
  uploadQrCode
);

export default siswaRoutes;
