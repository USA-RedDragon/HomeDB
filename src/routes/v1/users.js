const controllers = require('../../controllers/v1/users');

module.exports = (app, version) => {
    app.get(`/api/${version}/users`, controllers.GETAPIUsers);
    app.get(`/api/${version}/users/me`, controllers.GETAPIUsersMe);
    app.get(`/api/${version}/users/:id`, controllers.GETAPIUsersId);
    app.put(`/api/${version}/users/:id`, controllers.PUTAPIUsersId);
    app.delete(`/api/${version}/users/:id`, controllers.DELETEAPIUsersId);
    app.post(`/api/${version}/users`, controllers.POSTAPIUsers);
};
