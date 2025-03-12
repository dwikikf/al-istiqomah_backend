import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";
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

  // Dapatkan tanggal hari ini (tanpa waktu, hanya YYYY-MM-DD)
  const today = new Date();
  console.log(`today ${today}`);

  today.setHours(0, 0, 0, 0); // Reset waktu ke 00:00:00
  console.log(`today set hours ${today}`);

  const tomorrow = new Date(today);
  console.log(`tomorrow ${tomorrow}`);

  tomorrow.setDate(today.getDate() + 1); // Besok (untuk batas atas query)
  console.log(`tomorrow di set ke atas ${tomorrow}`);

  // Cek apakah siswa sudah absen hari ini
  const existingAbsensi = await absensiRepository.findOne({
    where: {
      nisn,
      tanggal: MoreThanOrEqual(today) && LessThanOrEqual(tomorrow),
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
