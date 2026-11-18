// Fungsi: semua pemanggilan API ke backend (memakai Fetch API)

const BASE_URL = "http://localhost:5000/api/siswa";

// Kirim request, lempar error jika status bukan 2xx
async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const body = await res.json();
  if (!res.ok) {
    const error = new Error(body.message || "Operasi gagal");
    error.response = { data: body };
    throw error;
  }
  return body;
}

const siswaService = {
  getAll: async () => (await request(BASE_URL)).data,
  create: (data) =>
    request(BASE_URL, { method: "POST", body: JSON.stringify(data) }),
  update: (kode, data) =>
    request(`${BASE_URL}/${kode}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  remove: (kode) => request(`${BASE_URL}/${kode}`, { method: "DELETE" }),
};

export default siswaService;
