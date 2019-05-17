const controllers = require('../../controllers/v1/paychecks');

module.exports = (app, version) => {
    app.get(`/api/${version}/paychecks`, controllers.GETApiPaychecks);
    app.get(`/api/${version}/paychecks/:id`, controllers.GETApiPaychecksId);
    app.post(`/api/${version}/paychecks`, controllers.POSTApiPaychecks);
    app.put(`/api/${version}/paychecks/:id`, controllers.PUTApiPaychecksId);
    app.delete(`/api/${version}/paychecks/:id`, controllers.DELETEApiPaychecksId);
};
