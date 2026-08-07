# 📬 Panduan Pengujian REST API via Postman

Dokumen ini berisi panduan lengkap untuk menguji endpoint REST API **Toko Sembako Ariesta** menggunakan [Postman](https://www.postman.com/) atau [Thunder Client](https://www.thunderclient.com/) (extension VS Code).

---

## Prasyarat

1. Server sudah berjalan di `http://localhost:3000`
   ```bash
   npm run dev
   ```
2. Postman atau Thunder Client sudah terinstall

---

## Endpoint yang Tersedia (Sprint 1)

### 1. GET `/api/products` — Ambil Semua Produk

| Item | Detail |
|------|--------|
| **Method** | `GET` |
| **URL** | `http://localhost:3000/api/products` |
| **Akses** | Publik (tanpa login) |
| **Body** | Tidak perlu |

**Langkah pengujian:**
1. Buka Postman, buat request baru
2. Pilih method **GET**
3. Masukkan URL: `http://localhost:3000/api/products`
4. Klik **Send**

**Expected Response:**
- Status Code: `200 OK`
- Content-Type: `application/json`

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Beras Premium 5kg",
      "category": "Sembako",
      "price": 68000,
      "stock": 20
    },
    {
      "id": 2,
      "name": "Minyak Goreng 2L",
      "category": "Sembako",
      "price": 34000,
      "stock": 15
    },
    {
      "id": 3,
      "name": "Gula Pasir 1kg",
      "category": "Sembako",
      "price": 17000,
      "stock": 30
    },
    {
      "id": 4,
      "name": "Telur Ayam 1kg",
      "category": "Sembako",
      "price": 28000,
      "stock": 12
    },
    {
      "id": 5,
      "name": "Tepung Terigu 1kg",
      "category": "Bahan Masak",
      "price": 12000,
      "stock": 25
    },
    {
      "id": 6,
      "name": "Kopi Bubuk 250g",
      "category": "Minuman",
      "price": 22000,
      "stock": 18
    },
    {
      "id": 7,
      "name": "Teh Celup Kotak 25 pcs",
      "category": "Minuman",
      "price": 9000,
      "stock": 40
    },
    {
      "id": 8,
      "name": "Mi Instan 1 Dus",
      "category": "Bahan Masak",
      "price": 100000,
      "stock": 8
    }
  ]
}
```

**Screenshot contoh:**

![GET /api/products](docs/screenshots/postman-get-products.png)

---

## Pengujian via Browser

Endpoint `GET` juga bisa diuji langsung di browser:

1. Buka browser (Chrome/Firefox/Edge)
2. Ketik di address bar: `http://localhost:3000/api/products`
3. Tekan Enter
4. Response JSON akan tampil langsung di browser

**Screenshot contoh:**

![Browser test](docs/screenshots/browser-api-products.png)

---

## Pengujian via cURL (Terminal)

```bash
# Ambil semua produk
curl http://localhost:3000/api/products
```

**Contoh output di terminal:**

![cURL test](docs/screenshots/curl-api-products.png)

---

## Checklist Pengujian Sprint 1

| # | Test Case | Method | URL | Expected Status | Hasil |
|---|-----------|--------|-----|-----------------|-------|
| 1 | Ambil semua produk | GET | `/api/products` | 200 + JSON array 8 produk | ✅ |
| 2 | Response format sesuai kontrak | GET | `/api/products` | `{ "status": "success", "data": [...] }` | ✅ |
| 3 | Setiap produk punya field lengkap | GET | `/api/products` | id, name, category, price, stock | ✅ |
| 4 | Content-Type header benar | GET | `/api/products` | `application/json` | ✅ |

---

## Catatan

- Endpoint **POST/PUT/DELETE** dan **autentikasi** belum diimplementasi di Sprint 1
- Endpoint tersebut akan ditambahkan di Sprint 2
- Untuk Sprint 1, hanya `GET /api/products` yang perlu diuji
