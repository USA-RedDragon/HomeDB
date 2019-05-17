const app = require('./app');
const config = require('./config');

const { name } = require('../package.json');
const port = config.http.port;

app.listen(port, () => console.log(`${name} listening on port ${port}!`));
