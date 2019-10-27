const plaid = require('plaid');
const config = require('../config');

const plaidClient = new plaid.Client(
    config.plaid.clientId,
    config.plaid.secret,
    config.plaid.publicKey,
    plaid.environments[config.plaid.env],
    { version: '2018-05-22' }
);

module.exports = (app) => {
    app.use((req, res, next) => {
        req.plaid = plaidClient;
        return next();
    });
};
