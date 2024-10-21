const mysql = require('mysql2')

// Criando nossa conexão com o banco de dados:
const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

module.exports = dbConnection.promise()