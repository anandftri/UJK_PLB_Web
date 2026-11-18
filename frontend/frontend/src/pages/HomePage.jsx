// Fungsi: halaman utama (data, pencarian, form, hapus, notifikasi)

import { useState, useEffect } from "react";
import siswaService from "../services/siswaService";
import Dashboard from "../components/Dashboard";
import SiswaTable from "../components/SiswaTable";
import SiswaForm from "../components/SiswaForm";

function HomePage() {
  const [siswa, setSiswa] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [siswaEdit, setSiswaEdit] = useState(null);
  const [notif, setNotif] = useState(null);

  const tampilNotif = (pesan, tipe = "sukses") => {
    setNotif({ pesan, tipe });
    setTimeout(() => setNotif(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      setSiswa(await siswaService.getAll());
    } catch (error) {
      tampilNotif("Gagal memuat data dari server", "gagal");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (form) => {
    setLoading(true);
    try {
      const hasil = siswaEdit
        ? await siswaService.update(siswaEdit.kode_siswa, form)
        : await siswaService.create(form);
      tampilNotif(hasil.message);
      setShowForm(false);
      setSiswaEdit(null);
      await loadData();
    } catch (error) {
      tampilNotif(error.response?.data?.message || "Operasi gagal", "gagal");
      setLoading(false);
    }
  };

  const handleDelete = async (s) => {
    if (!window.confirm(`Hapus siswa ${s.nama_siswa}?`)) return;
    setLoading(true);
    try {
      const hasil = await siswaService.remove(s.kode_siswa);
      tampilNotif(hasil.message);
      await loadData();
    } catch (error) {
      tampilNotif(error.response?.data?.message || "Gagal menghapus", "gagal");
      setLoading(false);
    }
  };

  const bukaTambah = () => {
    setSiswaEdit(null);
    setShowForm(true);
  };

  const bukaEdit = (s) => {
    setSiswaEdit(s);
    setShowForm(true);
  };

  const hasilFilter = siswa.filter(
    (s) =>
      s.kode_siswa.toLowerCase().includes(keyword.toLowerCase()) ||
      s.nama_siswa.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo">
          🎓 <span>SiswaKu</span>
        </div>
        <nav>
          <a className="aktif">📊 Dashboard</a>
          <a>👥 Data Siswa</a>
        </nav>
        <div className="sidebar-foot">Student Management System</div>
      </aside>

      <main className="konten">
        {notif && <div className={`notif ${notif.tipe}`}>{notif.pesan}</div>}

        <header className="hero">
          <div>
            <h1>Student Management System</h1>
            <p>
              Kelola data siswa dengan mudah: tambah, ubah, hapus, dan cari.
            </p>
          </div>
        </header>

        <Dashboard siswa={siswa} />

        <section className="panel">
          <div className="panel-head">
            <h3>Daftar Siswa</h3>
            <div className="toolbar">
              <input
                className="search"
                placeholder="🔎 Cari kode atau nama siswa..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className="btn tambah" onClick={bukaTambah}>
                + Tambah Siswa
              </button>
            </div>
          </div>

          {loading && <p className="loading">⏳ Memuat...</p>}

          <SiswaTable
            siswa={hasilFilter}
            onEdit={bukaEdit}
            onDelete={handleDelete}
          />
        </section>
      </main>

      {showForm && (
        <SiswaForm
          siswaEdit={siswaEdit}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          loading={loading}
        />
      )}
    </div>
  );
}

export default HomePage;
