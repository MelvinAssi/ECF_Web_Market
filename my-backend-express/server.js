const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT =  3000;

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
/*


app.options('*', cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
*/
const authRoutes = require('./routes/authRoutes');


app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API Express sécurisée !');
});

app.use('/auth', authRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
