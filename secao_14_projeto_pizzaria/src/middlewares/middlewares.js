const dbConnection = require('../db');
const datefns = require('date-fns');

const middlewares = {
    home: (req, res) => {
        res.render('index');
    },

    getAccounts: async (req, res) => {
        // Através da conexão criada em nosso arquivo db.js, conseguimos realizar consultas em nosso banco de dados através do método query().
        const result = (await (dbConnection.query('SELECT * FROM contas;'))).shift();
        res.render('accounts', { result });
    },

    addUser: async (req, res) => {
        /*
            Utilizando a biblioteca date-fns, conseguimos realizar o parse de nossa data a partir de determinado formato. Abaixo, estaremos passando três argumentos:

            1° - A string contendo a data.
            2° - O formato utilizado pela string.
            3° (Não obrigatório) - Data de referência para caso a string seja inválida ou incompleta.
        */
        const parsedDate = datefns.parse(req.body.birthDate, 'dd/MM/yyyy', new Date());
        dbConnection.execute(
            'INSERT INTO contas (nome, sobrenome, saldo, data_nascimento, cpf) VALUES (?, ?, ?, ?, ?);', 
            [req.body.name, req.body.lastname, req.body.balance, datefns.format(parsedDate, 'yyyy-MM-dd'), req.body.cpf],
            (error, result) => {
                if(error){
                    console.error('Erro ao cadastrar dados da conta', error);
                }else {
                    console.log('Dados cadastrados com sucesso', result);
                }
            }
        );
        res.render('index')
    },

    delAccount: (req, res, next) => {
        dbConnection.query('DELETE FROM contas WHERE cpf = ?;', [req.body[2]], (error, result) => {
            if (error){
                console.log('Erro ao remover conta', error);
            }else {
                console.log('Conta excluída com sucesso', result);
            }
        })
        next();
    }
}

module.exports = middlewares;