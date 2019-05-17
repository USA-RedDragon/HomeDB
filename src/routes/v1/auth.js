const passport = require('passport');
const controllers = require('../../controllers/v1/auth');

module.exports = (app, version) => {
    app.post(`/api/${version}/auth/login`, passport.authenticate('local', { session: true }), controllers.POSTApiLogin);
    app.get(`/api/${version}/auth/logout`, controllers.GETApiLogout);
    app.post(`/api/${version}/auth/usernameExists`, controllers.POSTApiUsernameExists);
};
