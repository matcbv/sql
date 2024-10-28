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
    connectTimeout: 10000, // Com connectTimeout, definimos o tempo limite de espera para a conexão com o banco de dados. Caso ultrapassado, um erro será levantado. O valor padrão é 10000 (10 segundos).
    idleTimeout: 30000 // Com idleTimeout, dedinimos o tempo limite em que uma conexão ociosa se mantém ativa. Caso ultrapassado, a conexão é encerrada. Não há valor padrão.
});

// Ao final, veremos um exemplo de consulta utilizando a conexão pool.

// ---------- query() ----------

// Executa uma consulta SQL no banco de dados. Pode ser usada de forma síncrona com callbacks ou assíncrona com Promises. Ideal para consultas não parametrizadas, por mais que também realize consultas parametrizadas. Ex.:

connection.query('SELECT * FROM contas', (error, result) => {
    error ? console.error('Erro ao consultar o banco de dados', error): console.log('Consulta realizada com sucesso', result);
});

// ---------- execute() ----------

// Parecido com query(), o execute() também é responsável por realizar consultas ao banco de dados, porém sendo mais indicado para consultas parametrizadas, sendo mais seguro contra injeções SQL.

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
    promiseConnection.end();
};

fetchData();

// ---------- end() e release() ----------

// Com end, conseguimos encerrar uma conexão ativa com o banco de dados, precisando criar uma nova no caso de realizarmos novas consultas. Ideal para momentos em que o programa será encerrado ou quando não será necessário realizar novas consultas por um período considerável de tempo.

// Já com createPool(), utilizaremos o método release(), responsável por liberar uma conexão para o pool de conexões disponíveis do banco de dados.

// ---------- getConnection() ----------

// Com getConnection(), obtemos uma conexão específica a partir de um pool de conexões. Diferente do pool.query ou pool.execute, que automaticamente pegam e liberam uma conexão para consultas simples, getConnection permite que você trabalhe diretamente com uma conexão única e persistente durante várias operações.

// ---------- Exemplo de consulta com poolConnection ----------

poolConnection.getConnection((err, connection) => {
    if(err){
        console.log('Erro ao obter conexão com o pool do banco de dados', err);
    } else{
        connection.execute('INSERT INTO contas(saldo) VALUES (2000) WHERE ID = ?;', [id]);
        const updatedData = connection.execute('SELECT * FROM contas WHERE ID = ?;', [id]);
        connection.release(); // Liberando a conexão reservada para nossas consultas.
    };
});
