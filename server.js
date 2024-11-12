const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/menu');
const Order = require('./models/Order'); // นำเข้าโมเดล Order

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.post('/Restaurant_Database/api/order', async (req, res) => {
    try {
        const { menu_name, price, quantity, total } = req.body;
        const order = new Order({
            order_id: new mongoose.Types.ObjectId().toString(), // สร้าง order_id แบบสุ่ม
            menu_name,
            price,
            quantity,
            total
        });

        await order.save();
        res.status(201).json({ message: 'คำสั่งอาหารถูกบันทึกสำเร็จ' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'ไม่สามารถบันทึกคำสั่งอาหารได้' });
    }
});

// เชื่อมต่อกับ MongoDB
mongoose.connect('mongodb://localhost:27017/Restaurant_DB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/menu', orderRoutes);

// เสิร์ฟไฟล์ HTML
app.use('/Restaurant_Database', express.static('views'));

// ปรับเส้นทาง
app.get('/Restaurant_Database/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});

app.get('/Restaurant_Database/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/Restaurant_Database/home', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});

app.get('/Restaurant_Database/orderlist', (req, res) => {
    res.sendFile(__dirname + '/views/orderlist.html');
});

app.get('/Restaurant_Database/menu1', (req, res) => {
    res.sendFile(__dirname + '/views/menu1.html');
});

app.get('/Restaurant_Database/menu2', (req, res) => {
    res.sendFile(__dirname + '/views/menu2.html');
});

app.get('/Restaurant_Database/menu3', (req, res) => {
    res.sendFile(__dirname + '/views/menu3.html');
});

app.get('/Restaurant_Database/status', (req, res) => {
    res.sendFile(__dirname + '/views/status.html');
});

app.get('/Restaurant_Database/payment', (req, res) => {
    res.sendFile(__dirname + '/views/payment.html');
});

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/Restaurant_Database/login`);
});
