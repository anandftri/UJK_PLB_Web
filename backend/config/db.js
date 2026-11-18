// File: backend/config/db.js
// Fungsi: membuat koneksi ke database PostgreSQL

require("dotenv").config();
const { Pool, types } = require("pg");

// Kolom DATE (tipe 1082) dikembalikan apa adanya sebagai teks YYYY-MM-DD,
// supaya tanggal tidak bergeser karena zona waktu
types.setTypeParser(1082, (value) => value);

// Pool = kumpulan koneksi yang bisa dipakai ulang (lebih efisien)
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Fungsi untuk mengetes koneksi saat server dinyalakan
async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Database terhubung:", result.rows[0].now);
  } catch (error) {
    console.error("Gagal terhubung ke database:", error.message);
    process.exit(1);
  }
}

module.exports = { pool, testConnection };
