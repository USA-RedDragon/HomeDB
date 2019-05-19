const routesWhitelist = [
    '/api/v*/version',
    '/api/v*/ping',
    '/api/v*/auth/login',
    '/api/v*/auth/logout',
    '/api/v*/auth/usernameExists',
];

module.exports = routesWhitelist;
