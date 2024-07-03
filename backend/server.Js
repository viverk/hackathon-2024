/* eslint-disable prettier/prettier */
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const port = 5000;

// Connexion DB
connectDB();

const app = express();

// Middleware qui traite les données de la request
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/users', require('./routes/user.routes'));
app.use('/sessions', require('./routes/session.routes'));

// Lancer serveur
app.listen(port, () => console.log('Le serveur est démarré au port ' + port));
