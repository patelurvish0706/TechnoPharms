const API_KEY = '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';
const YT_API_KEY = 'AIzaSyBbSaGqJvWNdOJnwA58VoIIUXsBA1ZD8Pc';


// -------------------- Event Listener for "giveSolution" Button --------------------

function giveSolution(event) {
    event.preventDefault();
    const userInput = document.getElementById('prob-states').value.trim();
            if (!userInput) {
                alert("Please enter your device's issue.");
                return;
            }else{
                window.location.href = 'solution.html';
            }
            sessionStorage.setItem('initialQuery', userInput);
            sessionStorage.setItem('initialProcessed', 'false');
            sessionStorage.removeItem('youtubePrompt');
}

const initialQuery = sessionStorage.getItem('initialQuery');
let youtubeSearchPrompt = sessionStorage.getItem('youtubePrompt');
let hasInitialQueryProcessed = sessionStorage.getItem('initialProcessed') === 'true';

// ------------------------------ YouTube Prompt Generation ------------------------------
if (initialQuery && !hasInitialQueryProcessed) {
    fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'X-Title': 'YouTube Prompt Generator'
        },
        body: JSON.stringify({
            // model: 'meta-llama/llama-3.2-3b-instruct:free',//deepseek/deepseek-r1-0528-qwen3-8b:free
            model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
            messages: [
                {
                    role: 'system',
                    content: 'Convert this laptop/android/iphone or any specific device issue into a short YouTube search query. Reply with only the search prompt, nothing else.'
                },
                {
                    role: 'user',
                    content: initialQuery
                }
            ]
        })
    })
        .then(res => res.json())
        .then(data => {
            youtubeSearchPrompt = data.choices?.[0]?.message?.content?.trim() || '';
            sessionStorage.setItem('youtubePrompt', youtubeSearchPrompt);
            sessionStorage.setItem('initialProcessed', 'true');
            console.log('🎯 YouTube Search Prompt:', youtubeSearchPrompt);
            fetchYouTubeVideos(youtubeSearchPrompt);
        })
        .catch(err => console.error('❌ Error getting YouTube prompt:', err));
} else if (youtubeSearchPrompt) {
    fetchYouTubeVideos(youtubeSearchPrompt);
}

// ------------------------------ YouTube Video Fetching ------------------------------

function fetchYouTubeVideos(prompt) {
    const container = document.getElementById('videoResults');
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(prompt)}&key=${YT_API_KEY}&type=video`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
                container.innerHTML = `<div class="no-videos">No videos found or API issue.</div>`;
                return;
            }

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
        .catch(err => {
            console.error("❌ YouTube Fetch Error:", err);
            container.innerHTML = `<div class="no-videos">Error fetching YouTube videos.</div>`;
        });
}


// --------------------------- chatBot -----------------------

const chatBox = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

let chatHistory = [
    { role: 'system', content: 'You are an assistant that answers user questions simply.' }
];

// Clear session storage after 10 minutes
const sessionStart = sessionStorage.getItem('sessionStart');
const now = Date.now();
if (!sessionStart || now - parseInt(sessionStart) > 10 * 60 * 1000) {
    sessionStorage.clear();
    sessionStorage.setItem('sessionStart', now.toString());
}

// Event listener to reset chat on new input
const giveSolutionBtn = document.getElementById('giveSolution');
if (giveSolutionBtn) {
    giveSolutionBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const userInput = document.getElementById('prob-states').value.trim();

        if (!userInput) {
            alert("Please enter your device's issue.");
            return;
        }

        // Clear previous session and start fresh
        sessionStorage.clear();
        sessionStorage.setItem('initialQuery', userInput);
        sessionStorage.setItem('sessionStart', Date.now().toString());

        // Redirect
        window.location.href = 'solution.html';
    });
}

// Restore chat history from sessionStorage if available
const savedHistory = sessionStorage.getItem('chatHistory');
if (savedHistory) {
    chatHistory = JSON.parse(savedHistory);
    chatHistory.forEach(msg => {
        if (msg.role === 'user') {
            appendMessage('user', msg.content);
        } else if (msg.role === 'assistant') {
            appendMessage('ai', formatResponse(msg.content), true);
        }
    });
}

function appendMessage(role, content, isHTML = false) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${role}`;
    msg.innerHTML = isHTML ? content : escapeHTML(content);
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
    return msg;
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

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    appendMessage('user', userMessage);
    chatInput.value = '';
    chatHistory.push({ role: 'user', content: userMessage });
    sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));

    const spinner = showSpinner();

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'X-Title': 'Simple AI Chat'
        },
        body: JSON.stringify({
            model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
            messages: chatHistory
        })
    });

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || 'No response from AI.';
    chatHistory.push({ role: 'assistant', content: aiReply });
    sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));

    spinner.remove();
    appendMessage('ai', formatResponse(aiReply), true);
});

window.addEventListener('DOMContentLoaded', async () => {
    const initialQuery = sessionStorage.getItem('initialQuery');
    const hasInitialQueryProcessed = sessionStorage.getItem('initialProcessed') === 'true';

    if (initialQuery && !hasInitialQueryProcessed && !savedHistory) {
        chatHistory.push({ role: 'user', content: initialQuery });
        sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        sessionStorage.setItem('initialProcessed', 'true');

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
        sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));

        spinner.remove();
        appendMessage('ai', formatResponse(aiReply), true);
    }
});

// redirect with validation
function redirectWithFallback(primaryUrl, fallbackUrl) {
    fetch(primaryUrl, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                window.location.href = primaryUrl;
            } else {
                window.location.href = fallbackUrl;
            }
        })
        .catch(() => {
            window.location.href = fallbackUrl;
        });
}
