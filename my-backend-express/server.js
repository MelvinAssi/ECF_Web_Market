const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();
app.use(express.json());
app.use(cookieParser());
require('./entities');

const PORT =  3000;

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(helmet());
app.use(helmet.hsts({
  maxAge: 63072000,
  includeSubDomains: true,
  preload: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
});

app.use(limiter)

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 
    "default-src 'self';" + 
    "script-src 'self' https://www.google.com;" +
    "style-src 'self';" +
    "img-src 'self' data:;" +
    "font-src 'self';" +
    "connect-src 'self' https://www.google.com http://localhost:5173;" +
    "form-action 'self';" +
    "frame-ancestors 'none';" +
    "upgrade-insecure-requests;");
  next();
});

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes')
const listingRoutes = require('./routes/listingRoutes');
const orderRoutes = require('./routes/orderRoutes');
const transactionRoutes =require('./routes/transactionRoutes');
const reviewRoutes =require('./routes/reviewRoutes');
const contactRoutes =require('./routes/contactRoutes');

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API Express sécurisée !');
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);
app.use('/category',categoryRoutes);
app.use('/product',productRoutes);
app.use('/listing', listingRoutes);
app.use('/orders',orderRoutes);
app.use('/transaction',transactionRoutes);
app.use('/review',reviewRoutes);
app.use('/contact',contactRoutes);




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
