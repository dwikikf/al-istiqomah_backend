import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Siswa } from "../models/Siswa";
import { User } from "../models/User";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Untuk development, gunakan migration di production
  logging: false,
  entities: [Siswa, User],
});
