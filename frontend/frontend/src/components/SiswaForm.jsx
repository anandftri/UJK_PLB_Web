// Fungsi: form tambah dan edit siswa (modal)

import { useState } from "react";

const kosong = {
  kode_siswa: "",
  nama_siswa: "",
  alamat_siswa: "",
  tgl_siswa: "",
  jurusan_siswa: "",
};

function SiswaForm({ siswaEdit, onSubmit, onCancel, loading }) {
  const modeEdit = Boolean(siswaEdit);

  const [form, setForm] = useState(
    modeEdit
      ? { ...siswaEdit, tgl_siswa: String(siswaEdit.tgl_siswa).slice(0, 10) }
      : kosong,
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="overlay">
      <form className="modal" onSubmit={handleSubmit}>
        <h3>{modeEdit ? "Edit Siswa" : "Tambah Siswa"}</h3>

        <label>Kode Siswa</label>
        <input
          name="kode_siswa"
          value={form.kode_siswa}
          onChange={handleChange}
          disabled={modeEdit}
          required
        />

        <label>Nama Siswa</label>
        <input
          name="nama_siswa"
          value={form.nama_siswa}
          onChange={handleChange}
          required
        />

        <label>Alamat Siswa</label>
        <textarea
          name="alamat_siswa"
          value={form.alamat_siswa}
          onChange={handleChange}
          required
        />

        <label>Tanggal</label>
        <input
          type="date"
          name="tgl_siswa"
          value={form.tgl_siswa}
          onChange={handleChange}
          required
        />

        <label>Jurusan</label>
        <input
          name="jurusan_siswa"
          value={form.jurusan_siswa}
          onChange={handleChange}
          required
        />

        <div className="actions">
          <button type="button" className="btn batal" onClick={onCancel}>
            Batal
          </button>
          <button type="submit" className="btn simpan" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SiswaForm;
