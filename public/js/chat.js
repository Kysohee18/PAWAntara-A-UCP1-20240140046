document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');
  const suggestions = document.querySelectorAll('.suggestion');

  const addMessage = (message, sender) => {
    const bubble = document.createElement('div');
    bubble.className = `bubble ${sender}`;
    bubble.textContent = message;
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const sendMessage = async (message) => {
    addMessage(message, 'user');
    
    // Add loading indicator
    const loadingId = 'loading-' + Date.now();
    const loadingBubble = document.createElement('div');
    loadingBubble.className = 'bubble bot';
    loadingBubble.id = loadingId;
    loadingBubble.textContent = 'Mengetik...';
    chatBody.appendChild(loadingBubble);
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      
      const data = await response.json();
      
      // Remove loading
      const loadElem = document.getElementById(loadingId);
      if (loadElem) loadElem.remove();

      if (data.status === 'success') {
        addMessage(data.data.reply, 'bot');
      } else {
        addMessage('Maaf, terjadi kesalahan saat memproses pesan Anda.', 'bot');
      }
    } catch (err) {
      const loadElem = document.getElementById(loadingId);
      if (loadElem) loadElem.remove();
      addMessage('Maaf, tidak dapat terhubung ke server.', 'bot');
    }
  };

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (message) {
        chatInput.value = '';
        sendMessage(message);
      }
    });
  }

  suggestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const message = btn.textContent.trim();
      sendMessage(message);
    });
  });
});
