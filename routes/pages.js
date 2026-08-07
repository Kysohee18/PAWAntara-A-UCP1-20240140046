const express = require('express');
const router = express.Router();
const products = require('../data/products');

router.get('/', (req, res) => {
  const preview = products.slice(0, 4);
  res.render('index', {
    title: 'Beranda',
    preview,
  });
});

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

router.get('/tanya-ai', (req, res) => {
  res.render('tanya-ai', { title: 'Tanya AI' });
});

module.exports = router;