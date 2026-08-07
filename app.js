const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'toko-ariesta-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Custom Middleware: Request Logger (FR-08)
app.use((req, res, next) => {
  const now = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/', require('./routes/pages'));
app.use('/api', require('./routes/api'));

app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Halaman Tidak Ditemukan',
    user: req.session ? req.session.user : null
  });
});

app.listen(PORT, () => {
  console.log(`Toko Sembako Ariesta berjalan di http://localhost:${PORT}`);
});