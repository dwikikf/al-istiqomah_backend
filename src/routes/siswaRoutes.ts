import express from "express";
import {
  getAllSiswa,
  getSiswaByNisn,
  createSiswa,
  updateSiswa,
  deleteSiswa,
} from "../controllers/siswaController";

const siswaRoutes = express.Router();

siswaRoutes.get("/", getAllSiswa);
siswaRoutes.get("/:nisn", getSiswaByNisn);
siswaRoutes.post("/", createSiswa);
siswaRoutes.put("/:nisn", updateSiswa);
siswaRoutes.delete("/:nisn", deleteSiswa);

export default siswaRoutes;
