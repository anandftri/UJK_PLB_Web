// File: backend/routes/siswaRoutes.js
// Fungsi: mendefinisikan alamat endpoint dan menghubungkannya ke controller

const express = require("express");
const router = express.Router();
const siswaController = require("../controllers/siswaController");

router.get("/", siswaController.getAll);
router.get("/:kode_siswa", siswaController.getByKode);
router.post("/", siswaController.create);
router.put("/:kode_siswa", siswaController.update);
router.delete("/:kode_siswa", siswaController.delete);

module.exports = router;
