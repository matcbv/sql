const {poolConnection} = require('../db');

const poolMiddlewares = {
    getAccountsByPool: async () => {
        try{
            const connection = await poolConnection.getConnection();
            const [result] = connection.execute('SELECT * FROM contas;');
            return result;
        }catch(err){
            throw err;
        };
        
    },

    delAccountByPool: async (id) => {
        try{
            const connection = await poolConnection.getConnection();
            connection.execute('DELETE FROM contas WHERE id = ?;', [id]);
        }catch(err){
            throw err;
        };
    }
};

module.exports = poolMiddlewares;