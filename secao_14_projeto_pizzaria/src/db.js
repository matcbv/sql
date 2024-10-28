// Podemos importar o pacote do mysql de fuas maneiras:
const mysql = require('mysql2'); // API baseada em callbacks
const promiseMysql = require('mysql2/promise'); // API baseada em promises

// Criando nossa conexão com o banco de dados:
const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).promise(); // Convertendo a conexão para ser compatível com promises;

// Criando nosso pool com o banco de dados:

// Iremos utilizar nosso pool com a versão para promises de nosso mysql, que irá retornar uma instância baseada em promises para trabalharmos.
const poolConnection = promiseMysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,    
});   

module.exports = {dbConnection, poolConnection};