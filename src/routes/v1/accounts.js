const controllers = require('../../controllers/v1/accounts');

module.exports = (app, version) => {
    app.get(`/api/${version}/accounts`, controllers.GETAPIAccounts);
    app.post(`/api/${version}/accounts`, controllers.POSTApiAccounts);
    app.get(`/api/${version}/accounts/:id`, controllers.GETAPIAccountsId);
    app.put(`/api/${version}/accounts/:id`, controllers.PUTAPIAccountsId);
    app.delete(`/api/${version}/accounts/:id`, controllers.DELETEAPIAccountsId);
};
