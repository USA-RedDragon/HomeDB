const Hapi = require('hapi');
const Path = require('path')

const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0',
    debug: {
        request: ['error']
    },
    routes: { cors: true }
});

const init = async () => {

    await server.register([
        {
            plugin: require('hapi-sequelizejs'),
            options: [
                {
                    name: 'homedb',
                    models: ['./server/models/**/*.js'],
                    sequelize: require('./server/config/sequelize'),
                    sync: true,
                    forceSync: false
                }
            ]
        }
    ])

    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: ['response']
        }
    });

    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt', require('./server/config/auth'));
    server.auth.default('jwt');

    await server.register(require('inert'));

    // api routes
    const routes = require('./server/routes');
    server.route(routes);

    // static assets
    server.route({
        method: 'GET',
        path: '/static/{param*}',
        handler: {
            directory: {
                path: Path.join(__dirname, 'client/build/static'),
                listing: false,
                index: true
            }
        },
        options: {
            auth: false
        }
    });

    // everything else (ie. react routes)
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: function (request, h) {
            return h.file('client/build/index.html');
        },
        options: {
            auth: false
        }
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();