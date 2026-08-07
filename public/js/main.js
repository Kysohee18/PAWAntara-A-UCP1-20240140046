document.addEventListener('DOMContentLoaded', function () {
  // Hamburger menu toggle
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute(
        'aria-label',
        isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'
      );
    });
  }

  // Logout handler (global, works on all pages)
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async function (e) {
      e.preventDefault();
      try {
        const response = await fetch('/api/logout', { method: 'POST' });
        const data = await response.json();
        if (data.status === 'success') {
          window.location.href = '/login';
        }
      } catch (err) {
        console.error('Logout error:', err);
        window.location.href = '/login';
      }
    });
  }
});