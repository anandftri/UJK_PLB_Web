// File: backend/controllers/siswaController.js
// Fungsi: menerima request, memanggil service, mengirim response JSON

const siswaService = require("../services/siswaService");

class SiswaController {
  // Menangani error: pakai statusCode dari service, atau 500 jika error tak terduga
  handleError(res, error) {
    const status = error.statusCode || 500;
    const message = error.statusCode
      ? error.message
      : "Terjadi kesalahan pada server";
    if (!error.statusCode) console.error(error);
    res.status(status).json({ success: false, message });
  }

  // GET /api/siswa
  getAll = async (req, res) => {
    try {
      const data = await siswaService.getAllSiswa();
      res.status(200).json({ success: true, data });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  // GET /api/siswa/:kode_siswa
  getByKode = async (req, res) => {
    try {
      const data = await siswaService.getSiswaByKode(req.params.kode_siswa);
      res.status(200).json({ success: true, data });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  // POST /api/siswa
  create = async (req, res) => {
    try {
      const data = await siswaService.createSiswa(req.body);
      res
        .status(201)
        .json({ success: true, message: "Siswa berhasil ditambahkan", data });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  // PUT /api/siswa/:kode_siswa
  update = async (req, res) => {
    try {
      const data = await siswaService.updateSiswa(
        req.params.kode_siswa,
        req.body,
      );
      res
        .status(200)
        .json({ success: true, message: "Siswa berhasil diubah", data });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  // DELETE /api/siswa/:kode_siswa
  delete = async (req, res) => {
    try {
      await siswaService.deleteSiswa(req.params.kode_siswa);
      res
        .status(200)
        .json({ success: true, message: "Siswa berhasil dihapus" });
    } catch (error) {
      this.handleError(res, error);
    }
  };
}

module.exports = new SiswaController();
