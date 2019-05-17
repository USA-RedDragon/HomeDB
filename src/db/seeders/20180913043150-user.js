const argon2 = require('argon2');

module.exports = {
    up: async (queryInterface, _Sequelize) => {
        await queryInterface.bulkInsert('users', [{
            name: 'Jacob McSwain',
            username: 'USA-RedDragon',
            password: await argon2.hash('password'),
            email: 'jacob.a.mcswain@gmail.com',
            phone_number: '4055171253',
            admin: true,
            createdAt: '2018-09-11 04:31:36',
            updatedAt: '2018-09-11 04:31:36',
        }], {});
    },
    down: (queryInterface, _Sequelize) => {
        return queryInterface.bulkDelete('users', { username: 'USA-RedDragon' }, {});
    },
};
