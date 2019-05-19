const request = require('supertest');
const test = require('ava');

async function login(app) {
    const agent = request.agent(app);
    await agent.post('/api/v1/auth/login')
        .send({
            username: 'USA-RedDragon', password: 'password',
        });
    return agent;
}

test('List Accounts', async (t) => {
    const agent = await login(require('../../../src/app.js'));
    const res = await agent
        .get('/api/v1/accounts');

    t.is(res.status, 200);
});

test('Test Account Actions', async (t) => {
    t.plan(4);

    // Create an account
    const agent = await login(require('../../../src/app.js'));
    let res = await agent
        .post('/api/v1/accounts')
        .send({
            name: 'Test',
            balance: 100,
        });

    t.is(res.status, 200);

    const accountId = res.body.id;

    // Get account
    res = await agent
        .get(`/api/v1/accounts/${accountId}`);

    t.is(res.status, 200);

    // Update account
    res = await agent
        .put(`/api/v1/accounts/${accountId}`)
        .send({
            name: 'TestTest',
            balance: 1000,
        });

    t.is(res.status, 204);

    res = await agent
        .delete(`/api/v1/accounts/${accountId}`);

    t.is(res.status, 204);
});
