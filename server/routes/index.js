const auth = require('./auth');
const user = require('./user');
const transactions = require('./transactions');
const bank_accounts = require('./bank_accounts');
const debts = require('./debt');
const groceries = require('./groceries')
const transaction_types = require('./transaction_type')

module.exports = [].concat(auth, user, transactions, bank_accounts, debts, groceries, transaction_types);