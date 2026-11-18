CREATE TABLE IF NOT EXISTS siswa (
  kode_siswa    VARCHAR(10)  NOT NULL PRIMARY KEY,
  nama_siswa    VARCHAR(100) NOT NULL,
  alamat_siswa  VARCHAR(255) NOT NULL,
  tgl_siswa     DATE         NOT NULL,
  jurusan_siswa VARCHAR(100) NOT NULL
);

INSERT INTO siswa (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa)
VALUES ('S001', 'Budi Santoso', 'Jl. Merdeka No. 10, Jakarta', '2007-05-14', 'Rekayasa Perangkat Lunak');