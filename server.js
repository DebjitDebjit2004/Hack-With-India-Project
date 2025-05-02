require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
app.use(cors()); 
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Serve static files from the public directory
app.use(express.static('public'));

// Get port from environment variables or use default
const PORT = process.env.PORT || 5000;

// Main page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// AI route
app.get('/ai', (req, res) => {
    const animal = req.query.animal;
    if (!animal) {
        return res.redirect('/');
    }
    // Send the AI page
    res.sendFile(path.join(__dirname, 'public', 'ai.html'));
});

// Example of using API key in a route
app.get('/api/check', (req, res) => {
    // Check if API key is configured
    if (!process.env.API_KEY) {
        return res.status(500).json({ error: 'API key not configured' });
    }
    
    res.json({
        status: 'API key is configured',
        environment: process.env.NODE_ENV
    });
});

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
    try {
        console.log('Received chat request:', {
            body: req.body,
            apiKey: process.env.API_KEY ? 'Present' : 'Missing'
        });

        const { animal, message, history } = req.body;
        
        if (!process.env.API_KEY) {
            console.error('API key is missing in environment variables');
            return res.status(500).json({ 
                error: 'API key not configured',
                details: 'Please check your .env file'
            });
        }

        if (!animal || !message) {
            console.error('Missing required parameters:', { animal, message });
            return res.status(400).json({ 
                error: 'Missing required parameters',
                details: 'Animal and message are required'
            });
        }

        console.log('Sending request to OpenAI API...');
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: `You are a ${animal}. Respond as this animal would, sharing information about your species.`
                    },
                    ...(history || []),
                    {
                        role: "user",
                        content: message
                    }
                ],
                temperature: 0.7,
                max_tokens: 150
            })
        });

        console.log('OpenAI API Response Status:', response.status);
        const data = await response.json();
        console.log('OpenAI API Response:', data);

        if (!response.ok) {
            console.error('OpenAI API Error:', data);
            return res.status(response.status).json({ 
                error: 'Error from AI service',
                details: data.error?.message || 'Unknown error'
            });
        }

        if (!data.choices || !data.choices[0]?.message?.content) {
            console.error('Invalid response format:', data);
            return res.status(500).json({ 
                error: 'Invalid response format',
                details: 'Unexpected response from AI service'
            });
        }

        res.json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error('Chat API Error:', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log('API Key Status:', process.env.API_KEY ? 'Configured' : 'Missing');
});
