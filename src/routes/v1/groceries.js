const controllers = require('../../controllers/v1/groceries');

module.exports = (app, version) => {
    app.get(`/api/${version}/groceries`, controllers.GETApiGroceries);
    app.post(`/api/${version}/groceries`, controllers.POSTApiGroceries);
    app.get(`/api/${version}/groceries/list`, controllers.GETApiGroceriesList);
    app.delete(`/api/${version}/groceries/list`, controllers.DELETEApiGroceriesList);
    app.post(`/api/${version}/groceries/list`, controllers.POSTApiGroceriesList);
    app.get(`/api/${version}/groceries/default`, controllers.GETApiGroceriesDefault);
    app.delete(`/api/${version}/groceries/default`, controllers.DELETEApiGroceriesDefault);
    app.post(`/api/${version}/groceries/default`, controllers.POSTApiGroceriesDefault);
    app.post(`/api/${version}/groceries/generate`, controllers.POSTApiGroceriesGenerate);
};
