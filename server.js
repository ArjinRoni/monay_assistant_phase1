require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { initialize, chatWithAssistant } = require('./chatService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Initialize the chat service
(async function() {
  try {
    await initialize();
    console.log('Chat service initialized successfully');
  } catch (error) {
    console.error('Failed to initialize chat service:', error);
    process.exit(1);
  }
})();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');
  
  const userId = socket.handshake.query.userId;
  if (!userId) {
    console.error('No userId provided');
    socket.disconnect(true);
    return;
  }

  socket.on('chat message', async (msg) => {
    try {
      console.log(`Received message from user ${userId}: ${msg}`);
      const response = await chatWithAssistant(userId, msg);
      console.log(`Sending response to user ${userId}: ${response}`);
      socket.emit('chat response', response);
    } catch (error) {
      console.error(`Error processing message for user ${userId}:`, error);
      socket.emit('error', 'An error occurred while processing your request.');
    }
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${userId}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});