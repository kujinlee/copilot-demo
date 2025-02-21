'use strict';

/**
 * @file server.js
 * @description This file sets up an Express server with Socket.IO for real-time communication, 
 *              applies security middleware, serves static files, and handles various socket events.
 * @requires dotenv
 * @requires express
 * @requires http
 * @requires socket.io
 * @requires path
 * @requires ./security
 * @requires ./validation
 * @requires ./logger
 * @requires ./config/redisConfig
 */

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

/**
 * @function
 * @name app.get
 * @description Serves the HTML file at the root URL.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * @event connection
 * @description Handles a new Socket.IO connection.
 * @param {Object} socket - The socket object representing the connection.
 */
io.on('connection', (socket) => {
    
    logger.info('A user connected');

    // Assign a unique ID or name to the user
    const userId = `User${socket.id.substring(0, 5)}`;

    // Log the socket ID
    console.log(`Socket connected: ${socket.id}`);

    /**
     * @event message
     * @description Handles incoming messages from connected clients.
     * @param {string} message - The message sent by the client.
     */
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

    /**
     * @event disconnect
     * @description Handles the disconnection of a client.
     */
    socket.on('disconnect', () => {
        logger.info(`${userId} disconnected`);
        console.log(`Socket disconnected: ${socket.id}`);
    });

    /**
     * @event error
     * @description Handles socket errors.
     * @param {Error} error - The error object.
     */
    socket.on('error', (error) => {
        logger.error(`Socket error from ${userId}:`, error);
    });
});

/**
 * @event server.error
 * @description Handles server errors.
 * @param {Error} error - The error object.
 */
server.on('error', (error) => {
    logger.error('Server error:', error);
});

/**
 * @constant {number|string} PORT
 * @description The port number on which the server listens. Defaults to 3000 if not specified in environment variables.
 */
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    console.log(`Server running on port ${PORT}`);
});