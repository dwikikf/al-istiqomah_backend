import QRCode from "qrcode";
import { faker, fakerID_ID } from "@faker-js/faker";
import { AppDataSource } from "../../config/database";
import { Siswa } from "../../models/Siswa";
import { siswaRepository } from "../../repositories/SiswaRepository";
import path from "path";

const generateSiswa = async (jumlah: number) => {
  await AppDataSource.initialize(); // Pastikan koneksi ke database aktif

  for (let i = 0; i < jumlah; i++) {
    const siswa = new Siswa();
    siswa.nisn = faker.string.numeric(10); // NISN 10 digit
    siswa.nama = fakerID_ID.person.fullName();

    // set path image
    const qrCodePath = path.join("uploads", `${siswa.nisn}.png`);

    siswa.qrcode_imageURL = qrCodePath;

    // Buat QR Code
    await QRCode.toFile(qrCodePath, siswa.nisn);

    await siswaRepository.save(siswa);
  }

  console.log(`${jumlah} siswa berhasil ditambahkan.`);
  await AppDataSource.destroy();
};

generateSiswa(30).catch(console.error);
