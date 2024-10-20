
const mysql = require('mysql2');

// Métodos do pacote mysql2

// ---------- createConnection() ----------

// Com createConnection, cria-se uma única conexão com o banco de dados, que precisa ser aberta e fechada manualmente. Ele é útil em situações simples, onde poucas consultas são feitas e você não precisa lidar com várias conexões simultâneas. Ex.:

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT // Podemos especificar a porta caso não estejamos utilizando a padrão do MySql (3306).
});

// ---------- createPool() ----------

// Com createPool, cria-se um conjunto (pool) de conexões reutilizáveis, que são abertas e gerenciadas automaticamente. Esse método é mais eficiente para aplicações com muitas requisições, pois ele mantém um número fixo de conexões abertas, evitando a sobrecarga de abrir e fechar conexões repetidamente. Ex.:

const poolConnection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10, // Com connectionList, definimos o número máximo de conexões simultâneas aceitas pelo pool. O valor padrão é 10.
    queueLimit: 0, // Com queueLimit, definimos o número máximo de requisições a serem colocadas na fila de espera. O valor padrão é 0.
    acquireTimeout: 10000, // Com acquireTimeout, definimos o tempo limite em que uma requisição ficará na fila de espera. Caso ultrapassado, um erro será levantado. O valor padrão é 10000 (10 segundos).
    idleTimeout: 30000 // Com idleTimeout, dedinimos o tempo limite em que uma conexão ociosa se mantém ativa. Caso ultrapassado, a conexão é encerrada. Não há valor padrão.
});

// ---------- query() ----------

// Executa uma consulta SQL no banco de dados. Pode ser usada de forma síncrona com callbacks ou assíncrona com Promises. Ideal para consultas não parametrizadas, por mais que também realize consultas parametrizadas. Ex.:

connection.query('SELECT * FROM contas', (error, result) => {
    error ? console.error('Erro ao consultar o banco de dados', error): console.log('Consulta realizada com sucesso', result);
});

// ---------- execute() ----------

const id = 1;

connection.execute('SELECT nome FROM contas WHERE id = ?', [id], (error, result) => {
    error ? console.error('Erro ao consultar o banco de dados', error): console.log('Consulta realizada com sucesso', result);
    connection.end();
});

// ---------- promise() ----------

// Com o método promise(), nossa conexão passa a aceitar o uso de promises.

const promiseConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).promise();

async function fetchData() {
    try {
        const [result] = await promiseConnection.query('SELECT * FROM users;');
        console.log('Resultado:', result);
    } catch (error) {
        console.error('Erro ao consultar o banco de dados', error);
    }
};

fetchData();

// ---------- end() ----------

// Encerra uma conexão ativa com o banco de dados.

connection.end();

// ---------- getConnection() ----------

