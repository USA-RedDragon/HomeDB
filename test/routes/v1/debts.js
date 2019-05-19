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

test('List Debts', async (t) => {
    const agent = await login(require('../../../src/app.js'));
    const res = await agent
        .get('/api/v1/debts');

    t.is(res.status, 200);
});

test('Test Debts Actions', async (t) => {
    t.plan(4);

    // Create a debt
    const agent = await login(require('../../../src/app.js'));
    let res = await agent
        .post('/api/v1/debts')
        .send({
            name: 'Test',
            amount: 100,
        });

    t.is(res.status, 200);

    const debtId = res.body.id;

    // Get debt
    res = await agent
        .get(`/api/v1/debts/${debtId}`);

    t.is(res.status, 200);

    // Update debt
    res = await agent
        .put(`/api/v1/debts/${debtId}`)
        .send({
            name: 'TestTest',
            amount: 1000,
        });

    t.is(res.status, 204);

    res = await agent
        .delete(`/api/v1/debts/${debtId}`);

    t.is(res.status, 204);
});
