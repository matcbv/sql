const path = require('path');

const express = require('express');
const router = express.Router();

const middlewares = require(path.resolve(__dirname, 'middlewares', 'middlewares.js'));

router.get('/', middlewares.home);

router.get('/accounts', middlewares.getAccounts);

router.post('/addUser', middlewares.addUser);

router.post('/delAccount', middlewares.delAccount, middlewares.getAccounts);

module.exports = router;