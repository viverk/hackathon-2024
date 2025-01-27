/* eslint-disable prettier/prettier */
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
const port = 5000;

// Connexion DB
connectDB();

const app = express();

app.use(cors());

// Middleware qui traite les données de la request
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/users', require('./routes/user.routes'));
app.use('/sessions', require('./routes/session.routes'));
app.use('/tokens', require('./routes/token.routes'));

// Lancer serveur
app.listen(port, () => console.log('Le serveur est démarré au port ' + port));
