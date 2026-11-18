// File: backend/services/siswaService.js
// Fungsi: class berisi validasi dan aturan bisnis data siswa

const siswaModel = require("../models/siswaModel");

// Class error khusus agar controller tahu status code yang tepat
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class SiswaService {
  // Validasi input: semua field wajib diisi
  validate(data, cekKode = true) {
    const fields = ["nama_siswa", "alamat_siswa", "tgl_siswa", "jurusan_siswa"];
    if (cekKode) fields.unshift("kode_siswa");

    for (const field of fields) {
      if (!data[field] || String(data[field]).trim() === "") {
        throw new AppError(`Field ${field} wajib diisi`, 400);
      }
    }
    if (isNaN(Date.parse(data.tgl_siswa))) {
      throw new AppError(
        "Format tgl_siswa tidak valid (gunakan YYYY-MM-DD)",
        400,
      );
    }
  }

  async getAllSiswa() {
    return await siswaModel.getAll();
  }

  async getSiswaByKode(kode_siswa) {
    const siswa = await siswaModel.getByKode(kode_siswa);
    if (!siswa) throw new AppError("Siswa tidak ditemukan", 404);
    return siswa;
  }

  async createSiswa(data) {
    this.validate(data, true);
    const sudahAda = await siswaModel.getByKode(data.kode_siswa);
    if (sudahAda) throw new AppError("Kode siswa sudah digunakan", 409);
    return await siswaModel.create(data);
  }

  async updateSiswa(kode_siswa, data) {
    this.validate(data, false);
    const hasil = await siswaModel.update(kode_siswa, data);
    if (!hasil) throw new AppError("Siswa tidak ditemukan", 404);
    return hasil;
  }

  async deleteSiswa(kode_siswa) {
    const hasil = await siswaModel.delete(kode_siswa);
    if (!hasil) throw new AppError("Siswa tidak ditemukan", 404);
    return hasil;
  }
}

module.exports = new SiswaService();
