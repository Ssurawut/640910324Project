const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// ลงทะเบียน
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ล็อกอิน
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ข้อมูลผู้ใช้
router.get('/user', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.query.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
