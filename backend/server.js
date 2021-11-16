if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

const connectDB = require('./config/db.js')

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');
const orderRoutes = require('./routes/orders');
const stripeRoutes = require('./routes/stripe');

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/checkout', stripeRoutes);

app.get('/', (req, res) => {
    res.send('Api is running....')
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))