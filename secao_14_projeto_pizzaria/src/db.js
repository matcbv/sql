// Podemos importar o pacote do mysql de duas maneiras:
const mysql = require('mysql2'); // API baseada em callbacks
const promiseMysql = require('mysql2/promise'); // API baseada em promises

// Criando nossa conexão com o banco de dados:
/*
    Com createConnection(), criamos uma única conexão direta com o banco de dados. sendo sempre a mesmo a ser reutilizada. Se o servidor cair ou a conexão der timeout, você precisa reconectar manualmente.

    É ideal para scripts pequenos, testes, coisas pontuais.
*/
const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).promise(); // Podemos converter a conexão para ser compatível com promises através do método promise(), tendo o mesmo comportamento do módulo promise do mysql2.

/*
    Criando nosso pool com o banco de dados:
    
    Cria um pool de conexões (conjunto de conexões abertas). Quando você faz uma query, o pool pega uma conexão livre, usa e devolve ao pool. Gerencia várias conexões automaticamente, as reconectando se houver falhas.

    Ideal para aplicações maiores, APIs ou servidores com muitas requisições simultâneas.
*/
 const poolConnection = promiseMysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,    
});   

module.exports = {dbConnection, poolConnection};
