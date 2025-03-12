import { AppDataSource } from "../config/database";
import { Siswa } from "../models/Siswa";

export const siswaRepository = AppDataSource.getRepository(Siswa);
