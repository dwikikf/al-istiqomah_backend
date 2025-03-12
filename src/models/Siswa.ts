import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("siswa")
export class Siswa {
  @PrimaryColumn({ type: "varchar", length: 10 })
  nisn!: string;

  @Column({ type: "varchar", length: 100 })
  nama!: string;

  @Column({ type: "text", nullable: true })
  qrcode_imageURL!: string;
}
