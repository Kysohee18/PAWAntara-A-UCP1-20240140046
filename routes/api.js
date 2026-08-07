const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const products = require('../data/products');
const users = require('../data/users');
const { isAuthenticated } = require('../middleware/auth');

// GET /products
router.get('/products', (req, res) => {
  res.json({ status: 'success', message: 'Products retrieved successfully', data: products });
});

// GET /products/:id
router.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) {
    return res.status(404).json({ status: 'error', message: 'Product not found', data: null });
  }
  res.json({ status: 'success', message: 'Product retrieved successfully', data: product });
});

// POST /products
router.post('/products', isAuthenticated, (req, res) => {
  const { name, category, price, stock } = req.body;
  if (!name || !category || price == null || stock == null) {
    return res.status(400).json({ status: 'error', message: 'All fields are required', data: null });
  }
  
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    name,
    category,
    price: parseInt(price, 10),
    stock: parseInt(stock, 10)
  };
  
  products.push(newProduct);
  res.status(201).json({ status: 'success', message: 'Product added successfully', data: newProduct });
});

// PUT /products/:id
router.put('/products/:id', isAuthenticated, (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) {
    return res.status(404).json({ status: 'error', message: 'Product not found', data: null });
  }
  
  const { name, category, price, stock } = req.body;
  if (name) product.name = name;
  if (category) product.category = category;
  if (price != null) product.price = parseInt(price, 10);
  if (stock != null) product.stock = parseInt(stock, 10);
  
  res.json({ status: 'success', message: 'Product updated successfully', data: product });
});

// DELETE /products/:id
router.delete('/products/:id', isAuthenticated, (req, res) => {
  const index = products.findIndex(p => p.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ status: 'error', message: 'Product not found', data: null });
  }
  
  const deleted = products.splice(index, 1)[0];
  res.json({ status: 'success', message: 'Product deleted successfully', data: deleted });
});

// POST /login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ status: 'error', message: 'Invalid username or password', data: null });
  }
  
  req.session.user = { id: user.id, username: user.username, role: user.role };
  res.json({ status: 'success', message: 'Login successful', data: { username: user.username, role: user.role } });
});

// POST /logout
router.post('/logout', isAuthenticated, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'Failed to logout', data: null });
    }
    res.json({ status: 'success', message: 'Logout successful', data: null });
  });
});

// POST /chat
router.post('/chat', (req, res) => {
  const { message } = req.body;
  const msg = message ? message.toLowerCase() : '';
  
  let reply = 'Maaf, saya belum bisa menjawab pertanyaan tersebut. Coba tanyakan tentang jam buka, ongkir, cara pembayaran, atau stok produk.';
  
  if (msg.includes('jam buka') || msg.includes('buka') || msg.includes('tutup')) {
    reply = 'Toko kami buka setiap hari jam 07.00 - 20.00 WIB';
  } else if (msg.includes('ongkir') || msg.includes('antar') || msg.includes('kirim')) {
    reply = 'Kami melayani pengantaran di area Yogyakarta dengan ongkir mulai Rp 5.000';
  } else if (msg.includes('bayar') || msg.includes('pembayaran') || msg.includes('transfer')) {
    reply = 'Kami menerima pembayaran tunai, transfer bank (BCA/BRI/Mandiri), dan QRIS';
  } else if (msg.includes('stok') || msg.includes('tersedia') || msg.includes('ada')) {
    reply = 'Untuk cek stok terbaru, silakan kunjungi halaman Produk kami atau tanyakan produk spesifik';
  } else if (msg.includes('harga')) {
    reply = 'Harga produk kami selalu ter-update di halaman Produk. Silakan cek langsung!';
  } else if (msg.includes('promo') || msg.includes('diskon')) {
    reply = 'Saat ini kami belum ada promo khusus. Pantau terus ya!';
  }
  
  res.json({ status: 'success', message: 'Chat reply', data: { reply } });
});

module.exports = router;