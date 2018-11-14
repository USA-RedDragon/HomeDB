const Hapi = require('hapi');

const server = Hapi.server({
    debug: {
        request: ['error']
    },
    routes: { cors: true }
});
var isInit = false;

const init = async () => {
    if(isInit) {
        return;
    }
    console.log('initing')
    await server.register([
        {
            plugin: require('hapi-sequelizejs'),
            options: [
                {
                    name: 'homedb',
                    models: ['models/**/*.js'],
                    sequelize: require('config/sequelize'),
                    sync: false,
                    forceSync: false
                }
            ]
        }
    ])
    console.log('registered sequelize')

    server.register(require('hapi-auth-jwt2'));
    console.log('registered hapi-auth-jwt2')

    server.auth.strategy('jwt', 'jwt', require('config/auth'));
    server.auth.default('jwt');
    console.log('set jwt auth')

    // api routes
    const routes = require('routes');
    server.route(routes);
    console.log('set routes')
    isInit = true;
};

process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection')
    console.log(err);
    process.exit(1);
});

exports.handler = async (event, context, callback) => {
    console.log('handler')
    await init();
    console.log(event)
    console.log(context)

    // map lambda event to hapi request
    const options = {
        method: event.httpMethod,
        url: event.path,
        payload: event.body,
        headers: event.headers,
        validate: false
    };
    console.log('set options')

    console.log('inject')
    res = await server.inject(options);
    delete res.headers["content-encoding"];
    const response = {
        "statusCode": res.statusCode,
        "body": JSON.stringify(res.result),
        "isBase64Encoded": false,
        "headers": res.headers
    };
    console.log('injected')

    return response;

};