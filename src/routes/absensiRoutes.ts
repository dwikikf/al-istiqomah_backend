import { Router } from "express";
import { addAbsensi, getAllAbsensi } from "../controllers/absensiController";

const absensiRoutes = Router();

absensiRoutes.get("/", getAllAbsensi);
absensiRoutes.post("/", addAbsensi);

export default absensiRoutes;
