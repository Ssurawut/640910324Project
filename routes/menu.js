const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

router.get('/api/menu1', async (req, res) => {
    try {
        const menu = await Menu.find({foodtype: 'อาหารจานเดียว'});
        res.json(menu);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching menu data' });
    }
});

router.post('/api/menu1', async (req, res) => {
    try {
        const newMenu = new Menu(req.body);
        await newMenu.save();
        res.status(201).json({ message: 'Menu created successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/api/menu2', async (req, res) => {
    try {
        const menu = await Menu.find({foodtype: 'กับข้าว'});
        res.json(menu);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching menu data' });
    }
});

router.get('/api/menu3', async (req, res) => {
    try {
        const menu = await Menu.find({foodtype: 'เครื่องดื่ม & อื่นๆ'});
        res.json(menu);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching menu data' });
    }
});

module.exports = router;
