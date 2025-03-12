import { AppDataSource } from "../config/database";
import { Absensi } from "../models/Absensi";

export const absensiRepository = AppDataSource.getRepository(Absensi);
