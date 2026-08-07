document.addEventListener('DOMContentLoaded', () => {
  const productForm = document.getElementById('productForm');
  const productTableBody = document.getElementById('productTableBody');
  const formError = document.getElementById('formError');
  const formTitle = document.getElementById('formTitle');
  const cancelBtn = document.getElementById('cancelBtn');
  const submitBtn = document.getElementById('submitBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  let isEditing = false;

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      
      if (data.status === 'success') {
        renderTable(data.data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      productTableBody.innerHTML = '<tr><td colspan="5" class="text-center text-danger py-3">Gagal memuat data</td></tr>';
    }
  };

  const renderTable = (products) => {
    if (!products || products.length === 0) {
      productTableBody.innerHTML = '<tr><td colspan="5" class="text-center py-3">Belum ada produk</td></tr>';
      return;
    }

    productTableBody.innerHTML = products.map(p => `
      <tr>
        <td>${p.name}</td>
        <td><span class="badge category-badge">${p.category}</span></td>
        <td>Rp ${p.price.toLocaleString('id-ID')}</td>
        <td>${p.stock}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-primary btn-edit" data-id="${p.id}" data-name="${p.name}" data-category="${p.category}" data-price="${p.price}" data-stock="${p.stock}">Edit</button>
          <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${p.id}">Hapus</button>
        </td>
      </tr>
    `).join('');

    // Attach event listeners
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', handleEditClick);
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', handleDeleteClick);
    });
  };

  const handleEditClick = (e) => {
    const btn = e.target;
    document.getElementById('productId').value = btn.dataset.id;
    document.getElementById('name').value = btn.dataset.name;
    document.getElementById('category').value = btn.dataset.category;
    document.getElementById('price').value = btn.dataset.price;
    document.getElementById('stock').value = btn.dataset.stock;
    
    isEditing = true;
    formTitle.textContent = 'Edit Produk';
    cancelBtn.classList.remove('d-none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = async (e) => {
    const id = e.target.dataset.id;
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        const data = await response.json();
        if (data.status === 'success') {
          fetchProducts();
        } else {
          alert(data.message || 'Gagal menghapus produk');
        }
      } catch (err) {
        alert('Terjadi kesalahan pada server');
      }
    }
  };

  const resetForm = () => {
    productForm.reset();
    document.getElementById('productId').value = '';
    isEditing = false;
    formTitle.textContent = 'Tambah Produk';
    cancelBtn.classList.add('d-none');
    formError.classList.add('d-none');
  };

  if (cancelBtn) {
    cancelBtn.addEventListener('click', resetForm);
  }

  if (productForm) {
    productForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const id = document.getElementById('productId').value;
      const name = document.getElementById('name').value.trim();
      const category = document.getElementById('category').value;
      const price = document.getElementById('price').value;
      const stock = document.getElementById('stock').value;

      if (!name || !category || !price || !stock) {
        formError.textContent = 'Semua field harus diisi';
        formError.classList.remove('d-none');
        return;
      }

      formError.classList.add('d-none');
      submitBtn.disabled = true;

      const payload = { name, category, price: Number(price), stock: Number(stock) };
      const url = isEditing ? `/api/products/${id}` : '/api/products';
      const method = isEditing ? 'PUT' : 'POST';

      try {
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
          resetForm();
          fetchProducts();
        } else {
          formError.textContent = data.message || 'Gagal menyimpan produk';
          formError.classList.remove('d-none');
        }
      } catch (err) {
        formError.textContent = 'Terjadi kesalahan pada server';
        formError.classList.remove('d-none');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('/api/logout', { method: 'POST' });
        const data = await response.json();
        if (data.status === 'success') {
          window.location.href = '/login';
        }
      } catch (err) {
        console.error('Logout error:', err);
      }
    });
  }

  // Initial fetch
  fetchProducts();
});
