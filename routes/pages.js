const express = require('express');
const router = express.Router();
const products = require('../data/products');
const { isAuthenticated } = require('../middleware/auth');

// Middleware: pass user session to all views
router.use((req, res, next) => {
  res.locals.user = req.session ? req.session.user : null;
  next();
});

// Beranda
router.get('/', (req, res) => {
  const preview = products.slice(0, 4);
  res.render('index', {
    title: 'Beranda',
    preview,
  });
});

// Produk
router.get('/produk', (req, res) => {
  const { kategori, search } = req.query;
  let result = [...products];

  if (kategori) {
    result = result.filter(
      (p) => p.category.toLowerCase() === String(kategori).toLowerCase()
    );
  }

  if (search) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes(String(search).toLowerCase())
    );
  }

  const categories = [...new Set(products.map((p) => p.category))];

  res.render('produk', {
    title: 'Daftar Produk',
    products: result,
    categories,
    kategori: kategori || '',
    search: search || '',
    total: products.length,
  });
});

// Detail Produk
router.get('/produk/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).render('produk-detail', {
      title: 'Produk Tidak Ditemukan',
      product: null,
    });
  }

  res.render('produk-detail', {
    title: product.name,
    product,
  });
});

// Tanya AI
router.get('/tanya-ai', (req, res) => {
  res.render('tanya-ai', { title: 'Tanya AI' });
});

// Login
router.get('/login', (req, res) => {
  if (req.session && req.session.user) {
    return res.redirect('/dashboard');
  }
  res.render('login', { title: 'Login' });
});

// Dashboard (protected)
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { title: 'Dashboard Admin' });
});

module.exports = router;