# PAWAntara-A-UCP1-20240140046

## Toko Sembako Ariesta

Website & REST API untuk Toko Sembako Ariesta — UMKM Sembako & Kebutuhan Rumah Tangga.

**Nama:** shahky yandhana putra 
**NIM:** 20240140046  
**Kelas:** A  
**Mata Kuliah:** Pemrograman Aplikasi Web (PAW) — Semester Antara  
**Dosen Pengampu:** Ir. Asroni, S.T., M.Eng.

---

## Deskripsi Project

Aplikasi web full stack berbasis **Node.js + Express.js** dengan **EJS** sebagai view engine untuk Toko Sembako Ariesta milik Ibu Aries. Website ini menyediakan:

- Halaman publik untuk pelanggan melihat daftar produk, harga, dan stok
- Fitur pencarian dan filter produk berdasarkan kategori
- Halaman detail produk dengan route dinamis
- Halaman Tanya AI (tampilan chat)
- REST API endpoint untuk data produk dalam format JSON
- Custom middleware (request logger)

**Tech Stack:**
- Backend: Node.js + Express.js
- View Engine: EJS (dengan partials)
- Styling: Bootstrap 5.3.3 CDN + Custom CSS
- Data: Array in-memory (file terpisah)

---

## Cara Menjalankan Project

```bash
# 1. Clone repository
git clone https://github.com/YOUR_USERNAME/PAWAntara-A-UCP1-20240140046.git

# 2. Masuk ke folder project
cd PAWAntara-A-UCP1-20240140046

# 3. Install dependencies
npm install

# 4. Jalankan server (development mode dengan nodemon)
npm run dev

# 5. Buka di browser
# http://localhost:3000
```

---

## Struktur Halaman (UI)

| Halaman | Route | Deskripsi |
|---------|-------|-----------|
| **Beranda** | `GET /` | Hero section dengan tagline toko, preview 4 produk unggulan, info strip (jam buka, pengantaran, update harga) |
| **Daftar Produk** | `GET /produk` | Menampilkan semua produk dalam card grid, dilengkapi filter kategori dan pencarian. Mendukung query string `?kategori=` dan `?search=` |
| **Detail Produk** | `GET /produk/:id` | Detail lengkap 1 produk (nama, kategori, harga, stok, ID). Menampilkan pesan "Produk tidak ditemukan" jika ID tidak valid |
| **Tanya AI** | `GET /tanya-ai` | Tampilan chat interaktif dengan form input, tombol saran pertanyaan. Logika balasan AI akan ditambahkan di Sprint 2 |
| **404** | Catch-all | Halaman error untuk URL yang tidak ditemukan |

---

## Daftar Endpoint API

| Method | Endpoint | Deskripsi | Akses | Contoh Response |
|--------|----------|-----------|-------|-----------------|
| `GET` | `/api/products` | Ambil seluruh data produk | Publik | `{ "status": "success", "data": [...] }` |

### Endpoint Sprint 2 (belum diimplementasi)

| Method | Endpoint | Deskripsi | Akses |
|--------|----------|-----------|-------|
| `GET` | `/api/products/:id` | Ambil satu produk berdasarkan ID | Publik |
| `POST` | `/api/products` | Tambah produk baru | Login |
| `PUT` | `/api/products/:id` | Update produk | Login |
| `DELETE` | `/api/products/:id` | Hapus produk | Login |
| `POST` | `/api/login` | Login admin/kasir | Publik |
| `POST` | `/api/logout` | Logout | Login |
| `POST` | `/api/chat` | Kirim pertanyaan, terima balasan AI dummy | Publik |

---

## Fitur Sprint 1

- [x] Server Express.js dengan EJS + partials (navbar & footer)
- [x] 4 route halaman: Beranda, Produk, Detail Produk, Tanya AI
- [x] Route dinamis `/produk/:id` dengan handling ID tidak ditemukan
- [x] Filter produk via query string (`?kategori=` dan `?search=`)
- [x] Endpoint REST API `GET /api/products` (JSON)
- [x] Custom middleware: request logger
- [x] Layout responsif (Bootstrap 5 + CSS Flexbox/Grid + 2 breakpoint media query)
- [x] Navbar dengan hamburger menu fungsional (vanilla JS)
- [x] HTML5 semantik di semua halaman
- [x] Form aksesibel (label terhubung, aria-label)
- [x] Data produk dummy di file terpisah (8 produk)

---

## Screenshot Halaman

### Beranda (`GET /`)
> Hero section, preview produk unggulan, dan info strip toko.

<img width="1910" height="1678" alt="homepage" src="https://github.com/user-attachments/assets/48b9a087-2a40-418f-846f-30c881eb4128" />


### Daftar Produk (`GET /produk`)
> Menampilkan semua produk dengan filter kategori dan pencarian.

<img width="1910" height="1097" alt="produk" src="https://github.com/user-attachments/assets/6062deca-95dc-4c17-abbb-8042b01e3985" />


### Filter Produk (`GET /produk?kategori=Sembako`)
> Hasil filter berdasarkan kategori "Sembako".

<img width="1910" height="1506" alt="daftar-produk" src="https://github.com/user-attachments/assets/fdaf0e48-007e-47f9-b5e6-7898b8cefe2b" />


### Detail Produk (`GET /produk/1`)
> Halaman detail lengkap 1 produk.

<img width="1910" height="1097" alt="produk" src="https://github.com/user-attachments/assets/f14e3858-5a3c-4467-b524-e850ec3642de" />



### Tanya AI (`GET /tanya-ai`)
> Tampilan chat interaktif dengan form input pertanyaan.

<img width="1910" height="1228" alt="ai page" src="https://github.com/user-attachments/assets/0a519a62-cacd-4a62-a328-0c7fd2094ba5" />

---

## Pengujian REST API via Postman

> Panduan lengkap pengujian REST API tersedia di file **[postman.md](postman.md)**.

### Quick Test — `GET /api/products`

| Item | Detail |
|------|--------|
| **Method** | `GET` |
| **URL** | `http://localhost:3000/api/products` |
| **Expected Status** | `200 OK` |
| **Response Format** | `{ "status": "success", "data": [...] }` |

**Screenshot Postman:**

![Postman GET Products](docs/screenshots/postman-get-products.png)

**Screenshot Browser:**

![Browser API Test](docs/screenshots/browser-api-products.png)
