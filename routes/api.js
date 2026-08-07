const express = require('express');
const router = express.Router();
const products = require('../data/products');

router.get('/products', (req, res) => {
  res.json({
    status: 'success',
    data: products,
  });
});

module.exports = router;