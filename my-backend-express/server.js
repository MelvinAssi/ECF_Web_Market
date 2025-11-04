const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
const https = require('https');
const app = express();
app.use(express.json());
app.use(cookieParser());
require('./entities');

const PORT =  3000;

app.use(cors({
    origin: [`${process.env.FRONT_URL}`,'https://techreuse-market.netlify.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true,
}));


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});
app.use(helmet());
app.use(helmet.hsts({
  maxAge: 63072000,
  includeSubDomains: true,
  preload: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 1000,
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
const paymentsRoutes = require('./routes/paymentsRoutes');
const sequelize = require('./config/db');

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
app.use('/payments', paymentsRoutes);



const keyPath = path.join(__dirname, 'certs', 'localhost-key.pem');
const certPath = path.join(__dirname, 'certs', 'localhost.pem');
const privateKey = fs.readFileSync(keyPath, 'utf8');
const certificate = fs.readFileSync(certPath, 'utf8');
const credentials = { key: privateKey, cert: certificate };
console.log(Object.keys(sequelize.models));
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Base de données synchronisée avec succès.");
    https.createServer(credentials, app).listen(PORT, ()  => {
       console.log(`✅ Serveur HTTPS démarré sur https://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(
      "Erreur lors de la synchronisation de la base de données :",
      err
    );
  });
