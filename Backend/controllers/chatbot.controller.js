const dotenv = require('dotenv');
dotenv.config();

console.log('Environment Variables:', process.env.GEMINI_API_KEY);

// Load environment variables from .env file
dotenv.config();

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

module.exports.chatController = async (req, res) => {
    try {
        const { animal, message } = req.body;

        if (!animal || !message) {
            return res.status(400).json({
                message: 'Animal and message are required',
            });
        }

        if (animal.length < 3 || message.length < 10) {
            return res.status(400).json({
                message: 'Animal name must be at least 3 characters long and message must be at least 10 characters long',
            });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                message: 'Gemini API key is not set in environment variables',
            });
        }

        try {
            // Format the prompt
            const prompt = `You are a ${animal}. Respond to the following message in character. Keep responses concise and engaging. If the message contains multiple questions or points, separate your responses with the | character. Provide information about yourself and some fun facts.`;

            // Send message to Gemini API
            const result = await chat.sendMessage(prompt + "\n\nUser: " + message);

            // Log the full response for debugging
            console.log('Gemini API raw response:', JSON.stringify(result, null, 2));

            // Extract the response text from the candidates array
            const text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!text) {
                console.error('Invalid response structure:', JSON.stringify(result, null, 2));
                throw new Error('Invalid response from Gemini API');
            }

            console.log('Gemini API response:', text);

            // Return the response
            res.status(201).json({ message: text });
        } catch (apiError) {
            console.error('Gemini API Error:', apiError);
            res.status(500).json({
                error: 'API Error',
                details: apiError.message || 'Error communicating with Gemini API',
            });
        }
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({
            error: 'Server Error',
            details: error.message || 'Internal server error',
        });
    }
};