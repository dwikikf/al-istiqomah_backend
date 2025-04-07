import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Siswa } from "./Siswa";

export enum AbsensiStatus {
  H = "H",
  I = "I",
  S = "S",
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

  @Column()
  tanggal!: Date;

  @Column({ type: "enum", enum: AbsensiStatus, default: AbsensiStatus.H })
  status!: AbsensiStatus;
}
