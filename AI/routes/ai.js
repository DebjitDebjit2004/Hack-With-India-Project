const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get the model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Start a chat
const chat = model.startChat({
    history: [],
    generationConfig: {
        maxOutputTokens: 1000,
    },
});

// AI route for serving the chat page
router.get('/', (req, res) => {
    const animal = req.query.animal;
    if (!animal) {
        return res.redirect('/');
    }
    res.sendFile('ai.html', { root: './public' });
});

// Chat route
router.post('/chat', async (req, res) => {
    try {
        const { animal, message, history } = req.body;
        
        if (!animal || !message) {
            return res.status(400).json({ 
                error: 'Missing parameters',
                details: 'Both animal and message are required'
            });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ 
                error: 'API configuration error',
                details: 'Gemini API key is not configured'
            });
        }

        console.log('Received chat request:', {
            animal,
            message,
            historyLength: history?.length || 0
        });

        try {
            // Format the prompt
            const prompt = `You are a ${animal}. Respond to the following message in character. Keep responses concise and engaging. If the message contains multiple questions or points, separate your responses with the | character. and have a give information about yourself and some fun facts`;

            // Send message to Gemini API
            const result = await chat.sendMessage(prompt + "\n\nUser: " + message);
            const response = await result.response;
            const text = response.text();

            console.log('Gemini API response:', text);

            // Return the response
            res.json({ response: text });
        } catch (apiError) {
            console.error('Gemini API Error:', apiError);
            res.status(500).json({ 
                error: 'API Error',
                details: apiError.message || 'Error communicating with Gemini API'
            });
        }
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ 
            error: 'Server Error',
            details: error.message || 'Internal server error'
        });
    }
});

module.exports = router; 