const API_KEY = '';
const YT_API_KEY = '';

// -------------------- Event Listener for "giveSolution" Button --------------------
document.addEventListener('DOMContentLoaded', () => {
  const solutionBtn = document.getElementById('giveSolution');
  if (solutionBtn) {
    solutionBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const userInput = document.getElementById('prob-states').value.trim();
      if (!userInput) {
        alert("Please enter your device's issue.");
        return;
      }
      sessionStorage.setItem('initialQuery', userInput);
      sessionStorage.setItem('initialProcessed', 'false');
      sessionStorage.removeItem('youtubePrompt');
      window.location.href = 'solution.html';
    });
  }
});

// -------------------- solution.html: Load YouTube + Chatbot --------------------
const initialQuery = sessionStorage.getItem('initialQuery');
let youtubeSearchPrompt = sessionStorage.getItem('youtubePrompt');
let hasInitialQueryProcessed = sessionStorage.getItem('initialProcessed') === 'true';

if (window.location.pathname.includes('solution.html')) {
  // YouTube Prompt Generation
  if (initialQuery && !hasInitialQueryProcessed) {
    fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'X-Title': 'YouTube Prompt Generator'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: [
          { role: 'system', content: 'Convert this into a short YouTube search query. Reply with only the search prompt, nothing else.' },
          { role: 'user', content: initialQuery }
        ]
      })
    })
    .then(res => res.json())
    .then(data => {
      youtubeSearchPrompt = data.choices?.[0]?.message?.content?.trim() || '';
      sessionStorage.setItem('youtubePrompt', youtubeSearchPrompt);
      sessionStorage.setItem('initialProcessed', 'true');
      fetchYouTubeVideos(youtubeSearchPrompt);
    })
    .catch(err => console.error('❌ Error getting YouTube prompt:', err));
  } else if (youtubeSearchPrompt) {
    fetchYouTubeVideos(youtubeSearchPrompt);
  }

  // YouTube Video Fetching
  function fetchYouTubeVideos(prompt) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(prompt)}&key=${YT_API_KEY}&type=video`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById('videoResults');
        if (!container) return;

        container.innerHTML = '';

        const first = data.items[0];
        const firstVideoId = first.id.videoId;

        const mainVideo = document.createElement('div');
        mainVideo.className = 'main-video';
        mainVideo.innerHTML = `
          <iframe src="https://www.youtube.com/embed/${firstVideoId}" allowfullscreen></iframe>
          <div class="main-video-title">${first.snippet.title}</div>
        `;
        container.appendChild(mainVideo);

        const list = document.createElement('div');
        list.className = 'video-list';

        data.items.slice(1).forEach(item => {
          const itemDiv = document.createElement('div');
          itemDiv.className = 'video-item';
          itemDiv.innerHTML = `
            <img src="${item.snippet.thumbnails.default.url}" />
            <div class="video-info">
              <div class="video-title">${item.snippet.title}</div>
            </div>
          `;
          itemDiv.addEventListener('click', () => {
            mainVideo.innerHTML = `
              <iframe src="https://www.youtube.com/embed/${item.id.videoId}" allowfullscreen></iframe>
              <div class="main-video-title">${item.snippet.title}</div>
            `;
          });
          list.appendChild(itemDiv);
        });

        container.appendChild(list);
      })
      .catch(err => console.error('❌ Error fetching videos:', err));
  }

  // Chatbot Setup
  const chatBox = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');

  let chatHistory = [{ role: 'system', content: 'You are an assistant that answers user questions simply.' }];

  function appendMessage(role, content, isHTML = false) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${role}`;
    msg.innerHTML = isHTML ? content : escapeHTML(content);
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function showSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'chat-message ai';
    spinner.innerHTML = '<span class="spinner"></span> Thinking...';
    chatBox.appendChild(spinner);
    chatBox.scrollTop = chatBox.scrollHeight;
    return spinner;
  }

  function escapeHTML(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function formatResponse(text) {
    return escapeHTML(text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>')
      .replace(/(\d+)\. /g, '<br><strong>$1.</strong> ');
  }

  chatForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    appendMessage('user', userMessage);
    chatInput.value = '';
    chatHistory.push({ role: 'user', content: userMessage });

    const spinner = showSpinner();

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'X-Title': 'Simple AI Chat'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: chatHistory
      })
    });

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || 'No response from AI.';
    chatHistory.push({ role: 'assistant', content: aiReply });

    spinner.remove();
    appendMessage('ai', formatResponse(aiReply), true);
  });

  window.addEventListener('DOMContentLoaded', async () => {
    if (initialQuery && !hasInitialQueryProcessed && chatBox) {
      chatHistory.push({ role: 'user', content: initialQuery });
      const spinner = showSpinner();

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'X-Title': 'Simple AI Chat'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.2-3b-instruct:free',
          messages: chatHistory
        })
      });

      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content || 'No response from AI.';
      chatHistory.push({ role: 'assistant', content: aiReply });

      spinner.remove();
      appendMessage('ai', formatResponse(aiReply), true);
    }
  });
}