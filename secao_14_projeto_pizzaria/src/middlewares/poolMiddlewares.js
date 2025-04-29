const {poolConnection} = require('../db');

const poolMiddlewares = {
    getAccountsByPool: async () => {
        // Ao obtermos a conexão manualemnte, devemos liberá-la ao final de sua utilização. Caso contrário, a conexão ficará 'presa', podendo esgotando o pool. É recomendado utilizarmos o getConnection() sempre que precisarmos realizar fazer várias consultas dentro de uma mesma transação ou operação.
        const connection = await poolConnection.getConnection();
        try{
            const [rows, ] = await connection.query('SELECT * FROM contas;');
            return rows;
        } catch(err){
            throw err;
        } finally{
            connection.release(); // Liberando a conexão com o método release().
        };
    },

    delAccountByPool: async (id) => {
        try{
            // Ao realizarmos nossa query diretamente de nosso pool, todo o processo de obtenção e liberação da conexão é feita de maneira automática, sendo ideal para consultas mais simples e de forma isolada.
            await poolConnection.execute('DELETE FROM contas WHERE id = ?;', [id]);
        }catch(err){
            throw err;
        };
    },
};

module.exports = poolMiddlewares;
