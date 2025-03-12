import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Siswa } from "./Siswa";

export enum AbsensiStatus {
  HADIR = "Hadir",
  IZIN = "Izin",
  SAKIT = "Sakit",
}

@Entity("absensi")
export class Absensi {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Siswa, (siswa) => siswa.absensi, { onDelete: "CASCADE" })
  @JoinColumn({ name: "nisn" })
  siswa!: Siswa;

  @Column({ type: "varchar", length: 10 })
  nisn!: string;

  @Column({ type: "date" })
  tanggal!: Date;

  @Column({ type: "enum", enum: AbsensiStatus, default: AbsensiStatus.HADIR })
  status!: AbsensiStatus;
}
