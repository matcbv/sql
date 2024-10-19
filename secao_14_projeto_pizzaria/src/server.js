require("dotenv").config();

const session = require("express-session");
const express = require("express");

const app = express();

function secretGenerator() {
    let secret = "";
    for (let i; i=0; i >= 24) {secret += String.fromCharCode(Math.random() * 94 + 32)};
    console.log(secret)
    return secret;
}

app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: secretGenerator(),
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 // 7 dias
    },
    saveUninitialized: false,
    resave: false
}));

app.listen(process.env.SERVER_PORT, () => {
    console.log('Servidor escutando na porta', process.env.SERVER_PORT)
})