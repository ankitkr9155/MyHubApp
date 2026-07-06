const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

const io = require('socket.io')(http, {
    cors: {
        origin: "*", // Yahan tum apni frontend URL daal sakte ho
        methods: ["GET", "POST"]
    }
});

// Socket logic
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // 1. Drawing Sync
    socket.on('draw', (data) => {
        // Sabhi users ko data bhejo (khud ko chhod kar)
        socket.broadcast.emit('draw', data);
    });

    // 2. Text Editor Sync
    socket.on('text-change', (data) => {
        socket.broadcast.emit('text-change', data);
    });

    // 3. Disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Basic Auth Route (Jaisa tumne fetch call kiya tha)
app.post('/api/auth/send-otp', (req, res) => {
    res.json({ message: "OTP sent successfully!" });
});

app.post('/api/auth/signup', (req, res) => {
    res.json({ name: req.body.name || "User" });
});

app.post('/api/auth/login', (req, res) => {
    res.json({ name: "User" });
});

http.listen(5000, () => {
    console.log('Server running on port 5000');
});