const request = require('supertest');
const test = require('ava');

test('Route Locking', async (t) => {
    const res = await request(require('../src/app.js'))
        .get('/api/v1/transactions');
    t.is(res.status, 403);
});

test('Cors Success', async (t) => {
    const res = await request(require('../src/app.js'))
        .options('/api/v1/auth/login')
        .set('Origin', 'http://localhost:3000');
    t.truthy(res.headers['access-control-allow-origin']);
});

test('Cors Failure', async (t) => {
    const res = await request(require('../src/app.js'))
        .options('/api/v1/auth/login')
        .set('Origin', 'http://notlocalhost.com');
    t.falsy(res.headers['access-control-allow-origin']);
});
