const bodyParserConfig = require('../config/middleware/body-parser');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(bodyParser.json(bodyParserConfig.json));
};
