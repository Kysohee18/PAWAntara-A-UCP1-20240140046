const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  
  if (req.originalUrl.startsWith('/api')) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized, silakan login terlebih dahulu'
    });
  }
  
  res.redirect('/login');
};

module.exports = { isAuthenticated };
