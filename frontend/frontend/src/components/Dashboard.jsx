// Fungsi: kartu ringkasan statistik siswa

function Dashboard({ siswa }) {
  const total = siswa.length;
  const jurusan = new Set(siswa.map((s) => s.jurusan_siswa)).size;

  // Hitung jurusan terbanyak
  const hitung = {};
  siswa.forEach((s) => {
    hitung[s.jurusan_siswa] = (hitung[s.jurusan_siswa] || 0) + 1;
  });
  const populer =
    Object.keys(hitung).sort((a, b) => hitung[b] - hitung[a])[0] || "-";

  // Siswa terbaru (kode terakhir)
  const terbaru = total > 0 ? siswa[siswa.length - 1].nama_siswa : "-";

  const items = [
    { ikon: "🎓", label: "Total Siswa", nilai: total, warna: "biru" },
    { ikon: "📚", label: "Jumlah Jurusan", nilai: jurusan, warna: "ungu" },
    {
      ikon: "🏆",
      label: "Jurusan Terbanyak",
      nilai: populer,
      warna: "hijau",
      kecil: true,
    },
    {
      ikon: "🆕",
      label: "Siswa Terakhir",
      nilai: terbaru,
      warna: "oranye",
      kecil: true,
    },
  ];

  return (
    <div className="dashboard">
      {items.map((it) => (
        <div className={`card ${it.warna}`} key={it.label}>
          <div className="ikon">{it.ikon}</div>
          <div>
            <p>{it.label}</p>
            <h2 className={it.kecil ? "kecil" : ""}>{it.nilai}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
