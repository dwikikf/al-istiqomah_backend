import { Request, Response } from "express";
import { createAbsensi } from "../services/AbsensiService";
import { AbsensiStatus } from "../models/Absensi";

export const addAbsensi = async (req: Request, res: Response) => {
  try {
    const { nisn, status } = req.body;
    const absensi = await createAbsensi(nisn, status || AbsensiStatus.HADIR);
    res.status(201).json(absensi);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};
