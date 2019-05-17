module.exports = {
    db: {
        host: process.env.MARIADB_HOST || 'localhost',
        username: process.env.MARIADB_USERNAME || 'username',
        password: process.env.MARIADB_PASSWORD || 'password',
        database: process.env.MARIADB_DATABASE || 'database',
    },
    signingSecret: process.env.SECRET || 'secret',
    http: {
        port: process.env.PORT || 3001,
        host: process.env.HOST || 'http://localhost:' + (process.env.PORT || 3001),
    },
};
