const auth = require('./auth');
const user = require('./user');
const transactions = require('./transactions');
const bank_accounts = require('./bank_accounts');
const debts = require('./debt');
const groceries = require('./groceries')

module.exports = [].concat(auth, user, transactions, bank_accounts, debts, groceries);