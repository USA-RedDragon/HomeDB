const request = require('supertest');
const test = require('ava');

test('Login Success', async (t) => {
    const res = await request(require('../../../src/app.js'))
        .post('/api/v1/auth/login')
        .send({ username: 'USA-RedDragon', password: 'password' });

    t.is(res.status, 200);
});

test('Login Failure', async (t) => {
    const res = await request(require('../../../src/app.js'))
        .post('/api/v1/auth/login')
        .send({ username: 'wrong', password: 'noway' });

    t.is(res.status, 401);
});

test('Logout', async (t) => {
    const res = await request(require('../../../src/app.js'))
        .get('/api/v1/auth/logout');

    t.is(res.status, 200);
});

test('Username Exists', async (t) => {
    const res = await request(require('../../../src/app.js'))
        .post('/api/v1/auth/usernameExists')
        .send({ username: 'USA-RedDragon' });

    t.is(res.status, 200);
});

test('Username Does Not Exists', async (t) => {
    const res = await request(require('../../../src/app.js'))
        .post('/api/v1/auth/usernameExists')
        .send({ username: 'doesnotexist' });

    t.is(res.status, 200);
});
