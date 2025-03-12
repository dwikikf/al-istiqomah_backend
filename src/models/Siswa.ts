import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Absensi } from "./Absensi";

@Entity("siswa")
export class Siswa {
  @PrimaryColumn({ type: "varchar", length: 10 })
  nisn!: string;

  @Column({ type: "varchar", length: 100 })
  nama!: string;

  @Column({ type: "text", nullable: true })
  qrcode_imageURL!: string;

  @OneToMany(() => Absensi, (absensi) => absensi.siswa)
  absensi!: Absensi[];
}
