// Fungsi: tabel data siswa + tombol Edit dan Hapus

function formatTanggal(tgl) {
  const [y, m, d] = String(tgl).slice(0, 10).split("-");
  const bulan = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  return `${d} ${bulan[Number(m) - 1]} ${y}`;
}

function inisial(nama) {
  return nama
    .split(" ")
    .slice(0, 2)
    .map((k) => k[0])
    .join("")
    .toUpperCase();
}

function SiswaTable({ siswa, onEdit, onDelete }) {
  if (siswa.length === 0) {
    return (
      <div className="kosong">
        <div className="ikon-besar">🔍</div>
        <p>Data siswa tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Kode</th>
            <th>Siswa</th>
            <th>Alamat</th>
            <th>Tanggal</th>
            <th>Jurusan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {siswa.map((s) => (
            <tr key={s.kode_siswa}>
              <td>
                <span className="kode">{s.kode_siswa}</span>
              </td>
              <td>
                <div className="orang">
                  <div className="avatar">{inisial(s.nama_siswa)}</div>
                  <span>{s.nama_siswa}</span>
                </div>
              </td>
              <td>{s.alamat_siswa}</td>
              <td>{formatTanggal(s.tgl_siswa)}</td>
              <td>
                <span className="badge">{s.jurusan_siswa}</span>
              </td>
              <td>
                <button className="btn edit" onClick={() => onEdit(s)}>
                  ✏️ Edit
                </button>
                <button className="btn hapus" onClick={() => onDelete(s)}>
                  🗑️ Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SiswaTable;
