import { Router } from "express";
import { addAbsensi } from "../controllers/absensiController";

const absensiRoutes = Router();

absensiRoutes.post("/", addAbsensi);

export default absensiRoutes;
