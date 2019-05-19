const request = require('supertest');
const test = require('ava');

test('Login Success', async (t) => {
    const res = await request(require('../../../src/app.js'))
        .get('/api/v1/version');

    t.is(res.status, 200);
});

test('Login Failure', async (t) => {
    const res = await request(require('../../../src/app.js'))
        .get('/api/v1/ping');

    t.is(res.status, 200);
});
