const auth = require('./auth');
const user = require('./user');
const transactions = require('./transactions');
const bank_accounts = require('./bank_accounts');
const debts = require('./debt');
const paychecks = require('./paycheck');
const groceries = require('./groceries')
const transaction_types = require('./transaction_type')

module.exports = [].concat(auth, user, transactions, bank_accounts, debts, paychecks, groceries, transaction_types);