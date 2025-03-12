import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { AppDataSource } from "./config/database";
import "reflect-metadata";
import siswaRoutes from "./routes/siswaRoutes";
import authRoutes from "./routes/authRoutes";
import absensiRoutes from "./routes/absensiRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Coba koneksi database
AppDataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Database connection error:", error));

// Default Route
app.get("/", (req: Request, res: Response) => {
  return res.send("API is running...");
});

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/siswa", siswaRoutes);
app.use("/api/absensi", absensiRoutes);

// Jalankan server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
