// File: backend/models/siswaModel.js
// Fungsi: class yang HANYA berisi query SQL ke tabel siswa

const { pool } = require("../config/db");

class SiswaModel {
  // READ: ambil semua siswa
  async getAll() {
    const result = await pool.query(
      "SELECT * FROM siswa ORDER BY kode_siswa ASC",
    );
    return result.rows;
  }

  // READ: ambil satu siswa berdasarkan kode
  async getByKode(kode_siswa) {
    const result = await pool.query(
      "SELECT * FROM siswa WHERE kode_siswa = $1",
      [kode_siswa],
    );
    return result.rows[0]; // undefined jika tidak ada
  }

  // CREATE: tambah siswa baru
  async create(data) {
    const { kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } =
      data;
    const result = await pool.query(
      `INSERT INTO siswa (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa],
    );
    return result.rows[0];
  }

  // UPDATE: ubah data siswa berdasarkan kode
  async update(kode_siswa, data) {
    const { nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = data;
    const result = await pool.query(
      `UPDATE siswa
       SET nama_siswa = $1, alamat_siswa = $2, tgl_siswa = $3, jurusan_siswa = $4
       WHERE kode_siswa = $5 RETURNING *`,
      [nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa, kode_siswa],
    );
    return result.rows[0];
  }

  // DELETE: hapus siswa berdasarkan kode
  async delete(kode_siswa) {
    const result = await pool.query(
      "DELETE FROM siswa WHERE kode_siswa = $1 RETURNING *",
      [kode_siswa],
    );
    return result.rows[0];
  }
}

module.exports = new SiswaModel();
