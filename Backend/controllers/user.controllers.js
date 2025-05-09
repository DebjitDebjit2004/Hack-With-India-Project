const { validationResult } = require('express-validator');
const userService = require('../services/user.service');
const userModel = require('../models/user.model');
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, forestId } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await userService.createUser({ name, email, password, forestId });
        const token = user.generateToken();
        res.cookie('token', token);
        res.status(201).json({ user, token });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = user.generateToken();
        res.cookie('token', token);
        res.json({ user, token });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.logout = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        await BlacklistToken.create({ token });
        res.clearCookie('token');
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


