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

test('Count Money', async (t) => {
    const agent = await login(require('../../../src/app.js'));
    const res = await agent
        .get('/api/v1/stats/money');

    t.is(res.status, 200);
});

test('Count Todos', async (t) => {
    const agent = await login(require('../../../src/app.js'));
    const res = await agent
        .get('/api/v1/stats/todos');

    t.is(res.status, 200);
});

test('Get Financial Health', async (t) => {
    const agent = await login(require('../../../src/app.js'));
    const res = await agent
        .get('/api/v1/stats/health');

    t.is(res.status, 200);
});

test('Get Weekly Transactions', async (t) => {
    const agent = await login(require('../../../src/app.js'));
    const res = await agent
        .get('/api/v1/stats/weekly_transactions');

    t.is(res.status, 200);
});

test('Get Monthly Balances', async (t) => {
    const agent = await login(require('../../../src/app.js'));
    const res = await agent
        .get('/api/v1/stats/monthly_balances');

    t.is(res.status, 200);
});

test('Get Yearly Debts', async (t) => {
    const agent = await login(require('../../../src/app.js'));
    const res = await agent
        .get('/api/v1/stats/yearly_debts');

    t.is(res.status, 200);
});
