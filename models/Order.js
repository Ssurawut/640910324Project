// Order model
const e = require('express');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id: { type: String, required: true, unique: true },
    menu_name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
});
module.exports = mongoose.model('Order', orderSchema);

