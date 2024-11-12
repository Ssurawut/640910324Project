// menu.model.js
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    foodType: { type: String, required: true },
});

const menuSchema = new mongoose.Schema({
    'อาหารจานเดียว': [foodSchema],
    'กับข้าว': [foodSchema],
    'เครื่องดื่ม & อื่นๆ': [foodSchema]
});

module.exports = mongoose.model('Menu', menuSchema);
