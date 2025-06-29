const express = require('express');


const app = express();
app.use(express.json());
const PORT =  3000;


const authRoutes = require('./routes/authRoutes');


app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API Express sécurisée !');
});

app.use('/auth', authRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
