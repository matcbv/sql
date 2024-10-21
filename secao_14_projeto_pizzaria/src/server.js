const path = require('path');

const env = require('dotenv');
env.config();

const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '..', 'frontend')))

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

const router = require(path.resolve(__dirname, 'routes.js'));
app.use(router);

app.listen(process.env.SERVER_PORT, () => console.log('Servidor escutando na porta', process.env.SERVER_PORT));
