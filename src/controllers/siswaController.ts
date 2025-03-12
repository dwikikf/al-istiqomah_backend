import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Siswa } from "../models/Siswa";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";

const siswaRepository = AppDataSource.getRepository(Siswa);

// ✅ Get all students
export const getAllSiswa = async (req: Request, res: Response) => {
  try {
    const siswa = await siswaRepository.find();
    res.json(siswa);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

// ✅ Get student by NISN
export const getSiswaByNisn = async (req: Request, res: Response) => {
  try {
    const siswaWithUrlNotFull = await siswaRepository.findOneBy({
      nisn: req.params.nisn,
    });
    if (!siswaWithUrlNotFull)
      return res.status(404).json({ message: "Siswa not found" });

    const baseURL = "http://localhost:5000"; // Sesuaikan dengan domain backend
    const siswa = {
      ...siswaWithUrlNotFull,
      qrcode_imageURL: `${baseURL}/${siswaWithUrlNotFull.qrcode_imageURL.replace(/\\/g, "/")}`,
    };

    console.log(siswa);
    res.json(siswa);

    // res.json(siswa);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

// ✅ Create new student
export const createSiswa = async (req: Request, res: Response) => {
  try {
    const { nisn, nama } = req.body;

    // set path image
    const qrCodePath = path.join("uploads", `${nisn}.png`);
    // Buat QR Code
    await QRCode.toFile(qrCodePath, nisn);

    const newSiswa = siswaRepository.create({
      nisn,
      nama,
      qrcode_imageURL: qrCodePath,
    });
    await siswaRepository.save(newSiswa);
    res.status(201).json(newSiswa);
  } catch (error) {
    res.status(500).json({ message: "Error creating student", error });
  }
};

// ✅ Update student
export const updateSiswa = async (req: Request, res: Response) => {
  try {
    const { nisn } = req.params;
    const siswa = await siswaRepository.findOneBy({ nisn });
    if (!siswa) return res.status(404).json({ message: "Siswa not found" });

    const updatedSiswa = await siswaRepository.save({ ...siswa, ...req.body });
    res.json(updatedSiswa);
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
};

// ✅ Delete student
export const deleteSiswa = async (req: Request, res: Response) => {
  try {
    const { nisn } = req.params;
    const siswa = await siswaRepository.findOneBy({ nisn });
    if (!siswa) return res.status(404).json({ message: "Siswa not found" });

    if (siswa.qrcode_imageURL) {
      const filename = path.basename(siswa.qrcode_imageURL);
      const filePath = path.join(__dirname, "../../uploads", filename);

      console.log("Deleting file:", filePath);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Hapus file
      }
    }

    await siswaRepository.delete({ nisn });
    res.json({ message: "Siswa deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};

// ✅ upload QR code yang memang di buat terpisah dlu. tidak langsung generate saat create siswa.
export const uploadQrCode = async (req: Request, res: Response) => {
  try {
    const { nisn } = req.params;
    const siswa = await siswaRepository.findOneBy({ nisn });

    if (!siswa) return res.status(404).json({ message: "Siswa not found" });

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    siswa.qrcode_imageURL = `/uploads/${req.file.filename}`; // Simpan path gambar
    await siswaRepository.save(siswa);

    res.json({ message: "QR Code uploaded successfully", siswa });
  } catch (error) {
    res.status(500).json({ message: "Error uploading file", error });
  }
};
