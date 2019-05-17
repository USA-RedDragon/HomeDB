const config = require('..');

const corsWhitelist = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://0.0.0.0:3000',
    config.http.host,
];

module.exports = {
    origin: function(origin, callback) {
        if (!origin || corsWhitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error(`${origin} not allowed by CORS`));
        }
    },
    credentials: true,
};
