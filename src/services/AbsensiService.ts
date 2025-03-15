import { Between, LessThan, MoreThanOrEqual } from "typeorm";
import { Absensi, AbsensiStatus } from "../models/Absensi";
import { absensiRepository } from "../repositories/AbsensiRepository";
import { siswaRepository } from "../repositories/SiswaRepository";

export const createAbsensi = async (
  nisn: string,
  status: AbsensiStatus = AbsensiStatus.HADIR
) => {
  const siswa = await siswaRepository.findOneBy({ nisn });
  if (!siswa) {
    throw new Error("Siswa tidak ditemukan");
  }

  const startDate = new Date();
  startDate.setUTCHours(0, 0, 0, 0);
  console.log("Rentang tanggal awal : ", startDate);

  const endDate = new Date(startDate);
  endDate.setUTCDate(startDate.getDate() + 1);
  console.log("Tanggal besok: ", endDate);

  // Cek apakah siswa sudah absen hari ini
  const existingAbsensi = await absensiRepository.findOne({
    where: {
      nisn,
      tanggal: Between(startDate, endDate),
    },
  });

  if (existingAbsensi) {
    throw new Error("Siswa sudah melakukan absensi hari ini");
  }

  const absensi = new Absensi();
  absensi.nisn = nisn;
  absensi.siswa = siswa;
  absensi.tanggal = new Date();
  absensi.status = status;

  return await absensiRepository.save(absensi);
};
