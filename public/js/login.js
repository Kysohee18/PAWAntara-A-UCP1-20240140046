document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      if (!username || !password) {
        loginError.textContent = 'Username dan password tidak boleh kosong';
        loginError.classList.remove('d-none');
        return;
      }

      loginError.classList.add('d-none');

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.status === 'success') {
          window.location.href = '/dashboard';
        } else {
          loginError.textContent = data.message || 'Login gagal';
          loginError.classList.remove('d-none');
        }
      } catch (err) {
        loginError.textContent = 'Terjadi kesalahan pada server';
        loginError.classList.remove('d-none');
      }
    });
  }
});
