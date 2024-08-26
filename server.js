const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Monay Backend is running');
});

// Connect to MongoDB
MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db('monay');
    // Here you'll add your database operations
  })
  .catch(error => console.error('Failed to connect to MongoDB:', error));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');
  // Here you'll handle socket events
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});