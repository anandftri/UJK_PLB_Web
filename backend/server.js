// File: backend/server.js
// Fungsi: titik awal aplikasi backend

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { testConnection } = require("./config/db");
const siswaRoutes = require("./routes/siswaRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // izinkan akses dari frontend
app.use(express.json()); // baca body request berformat JSON

// Route percobaan
app.get("/", (req, res) => {
  res.json({ message: "API Student Management berjalan" });
});
app.use("/api/siswa", siswaRoutes);

// Nyalakan server setelah koneksi database berhasil dites
async function startServer() {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

startServer();
