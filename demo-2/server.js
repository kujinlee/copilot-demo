require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const applySecurityMiddleware = require('./security');
const { validateMessage } = require('./validation');
const logger = require('./logger');
const configureRedis = require('./config/redisConfig'); // Import Redis configuration

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Configure Redis adapter
configureRedis(io);

// Apply security middleware
applySecurityMiddleware(app);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve the Socket.IO client library
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules', 'socket.io', 'client-dist')));

// Set up the Express server to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Set up the Socket.IO connection
io.on('connection', (socket) => {
    
    logger.info('A user connected');

    // Assign a unique ID or name to the user
    const userId = `User${socket.id.substring(0, 5)}`;

    // Handle message events
    socket.on('message', (message) => {
        try {
            // Validate the message
            validateMessage(message);

            logger.info(`Message from ${userId}: ${message}`);
            io.emit('message', { userId, message }); // Broadcast the message with user ID
        } catch (error) {
            logger.error(`Error handling message from ${userId}:`, error);
        }
    });

    // Handle disconnection events
    socket.on('disconnect', () => {
        logger.info(`${userId} disconnected`);
    });

    // Handle socket errors
    socket.on('error', (error) => {
        logger.error(`Socket error from ${userId}:`, error);
    });
});

// Handle server errors
server.on('error', (error) => {
    logger.error('Server error:', error);
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
