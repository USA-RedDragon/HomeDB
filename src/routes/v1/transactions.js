const controllers = require('../../controllers/v1/transactions');

module.exports = (app, version) => {
    app.get(`/api/${version}/transactions/types`, controllers.GETAPITransactionsTypes);
    app.get(`/api/${version}/transactions/types/:id?`, controllers.GETAPITransactionsTypesId);
    app.post(`/api/${version}/transactions/types`, controllers.POSTAPITransactionsTypes);
    app.put(`/api/${version}/transactions/types/:id`, controllers.PUTAPITransactionsTypesId);
    app.delete(`/api/${version}/transactions/types/:id`, controllers.DELETEAPITransactionsTypesId);

    app.get(`/api/${version}/transactions`, controllers.GETAPITransactions);
    app.get(`/api/${version}/transactions/:id`, controllers.GETAPITransactionsId);
    app.post(`/api/${version}/transactions`, controllers.POSTAPITransactions);
    app.put(`/api/${version}/transactions/:id`, controllers.PUTAPITransactionsId);
    app.delete(`/api/${version}/transactions/:id`, controllers.DELETEAPITransactionsId);
};
