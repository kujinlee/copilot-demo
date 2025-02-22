const socket = io();
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messages = document.getElementById('messages');

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('error', (error) => {
    console.error('Socket error:', error);
});

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = messageInput.value;
    socket.emit('message', message);
    messageInput.value = '';
});

socket.on('message', ({ userId, message }) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${userId}: ${message}`;
    messages.appendChild(messageElement);
});
