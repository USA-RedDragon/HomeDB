const request = require('supertest');
const test = require('ava');

// app.get(`/api/${version}/users`, controllers.GETAPIUsers);
// app.get(`/api/${version}/users/:id`, controllers.GETAPIUsersId);
// app.put(`/api/${version}/users/:id`, controllers.PUTAPIUsersId);
// app.delete(`/api/${version}/users/:id`, controllers.DELETEAPIUsersId);
// app.post(`/api/${version}/users`, controllers.POSTAPIUsers);

async function login(app) {
    const agent = request.agent(app);
    await agent.post('/api/v1/auth/login')
        .send({
            username: 'USA-RedDragon', password: 'password',
        });
    return agent;
}

test('List Users', async (t) => {
    const agent = await login(require('../../../src/app.js'));
    const res = await agent
        .get('/api/v1/users');

    t.is(res.status, 200);
});

test('Test Users Actions', async (t) => {
    t.plan(4);

    // Create a debt
    const agent = await login(require('../../../src/app.js'));
    let res = await agent
        .post('/api/v1/debts')
        .send({
            name: 'Test',
            username: 'TestUsername',
            password: 'password',
            email: 'test@email.com',
            phone_number: '4051111111',
            admin: false,
        });

    t.is(res.status, 200);

    const userId = res.body.id;

    // Get user
    res = await agent
        .get(`/api/v1/users/${userId}`);

    t.is(res.status, 200);

    // Update user
    res = await agent
        .put(`/api/v1/users/${userId}`)
        .send({
            email: 'testadmin@email.com',
            admin: true,
        });

    t.is(res.status, 204);

    res = await agent
        .delete(`/api/v1/users/${userId}`);

    t.is(res.status, 204);
});
