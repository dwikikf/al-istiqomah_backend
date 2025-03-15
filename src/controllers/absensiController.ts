import { Request, Response } from "express";
import { createAbsensi } from "../services/AbsensiService";
import { AbsensiStatus } from "../models/Absensi";
import { absensiRepository } from "../repositories/AbsensiRepository";
import { Between, LessThan, MoreThanOrEqual } from "typeorm";

// getAllAbsensi default by hari ini
export const getAllAbsensi = async (req: Request, res: Response) => {
  const startDate = new Date();
  startDate.setUTCHours(0, 0, 0, 0);
  console.log("Rentang tanggal awal : ", startDate);

  const endDate = new Date(startDate);
  endDate.setUTCDate(startDate.getDate() + 1);
  console.log("Tanggal besok: ", endDate);

  try {
    const absensi = await absensiRepository.find({
      where: {
        tanggal: Between(startDate, endDate),
      },
    });
    res.json(absensi);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

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
