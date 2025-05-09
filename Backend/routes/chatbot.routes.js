const express = require('express');
const router = express.Router();
const { chatController } = require('../controllers/chatbot.controller');

router.post('/chat-animal', chatController)

module.exports = router; 