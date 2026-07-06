require('dotenv').config(); // Sabse upar likhna
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch(err => console.error("DB Error:", err));
  
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: { origin: "*" } // Development ke liye allow kiya hai
});

// Real-time events
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Drawing Sync
    socket.on('drawing', (data) => {
        socket.broadcast.emit('drawing', data); // Dusre users ko bhej do
    });

    // Coding Sync
    socket.on('code-change', (code) => {
        socket.broadcast.emit('code-change', code);
    });

    // Disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

http.listen(3000, () => {
    console.log('Server running on port 3000');
});