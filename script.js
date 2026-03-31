const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    userInput.value = '';

    const loadingMsg = appendMessage('...', 'bot');

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        
        const data = await response.json();
        
        // Fix for "undefined" - Check if reply exists, else show error
        loadingMsg.innerText = data.reply || "I couldn't process that. Please try again.";
    } catch (error) {
        loadingMsg.innerText = "Error: Check your Vercel logs and API key.";
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}

function appendMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    return div;
}

function handleEnter(e) { if (e.key === 'Enter') sendMessage(); }
window.handleEnter = handleEnter;
window.sendMessage = sendMessage;
