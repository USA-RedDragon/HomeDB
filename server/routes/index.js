const auth = require('./auth');
const user = require('./user');
const records = require('./records');

module.exports = [].concat(auth, user, records);