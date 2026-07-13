// 1. Imports
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // .env file ko load karne ke liye
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// 2. Middlewares
app.use(cors()); // Frontend (React/HTML) ko connect karne ke liye
app.use(express.json()); // JSON data receive karne ke liye

// 3. Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 4. Chat Route
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message field khali hai!" });
        }

        // Gemini model initialization
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // AI se content generate karna
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        // Frontend ko response bhejna
        res.json({ reply: text });

    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: "Server error, shayad API key galat hai ya limit khatam ho gayi." });
    }
});

// 5. Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server successfully chal raha hai port ${PORT} par.`);
});