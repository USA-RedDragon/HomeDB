const controllers = require('../../controllers/v1/debts');

module.exports = (app, version) => {
    app.get(`/api/${version}/debts`, controllers.GETApiDebts);
    app.get(`/api/${version}/debts/:id`, controllers.GETApiDebtsId);
    app.post(`/api/${version}/debts`, controllers.POSTApiDebts);
    app.put(`/api/${version}/debts/:id`, controllers.PUTApiDebtsId);
    app.delete(`/api/${version}/debts/:id`, controllers.DELETEApiDebtsId);
};
