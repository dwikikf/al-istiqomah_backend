import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Siswa } from "../models/Siswa";

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
    const siswa = await siswaRepository.findOneBy({ nisn: req.params.nisn });
    if (!siswa) return res.status(404).json({ message: "Siswa not found" });
    res.json(siswa);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

// ✅ Create new student
export const createSiswa = async (req: Request, res: Response) => {
  try {
    const { nisn, nama, qrcode_imageURL } = req.body;
    const newSiswa = siswaRepository.create({ nisn, nama, qrcode_imageURL });
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
