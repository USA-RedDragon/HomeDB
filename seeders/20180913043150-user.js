'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      name: 'Jacob McSwain',
      username: 'USA-RedDragon',
      password: '$2a$10$vbsqn.yt3c8KS/eCemxs/engvdkjPHKxRSK6CfofK.POSUGJGtrAa',
      email: 'jacob.a.mcswain@gmail.com',
      phone_number: '4055171253',
      admin: true,
      createdAt: '2018-09-11 04:31:36',
      updatedAt: '2018-09-11 04:31:36'
    }], {});

    await queryInterface.bulkInsert('transaction_types', [{
      name: 'Groceries',
      createdAt: '2018-09-11 04:31:36',
      updatedAt: '2018-09-11 04:31:36'
    }], {});

    await queryInterface.bulkInsert('default_groceries', [{
      grocery: 1,
      amount: 1,
      createdAt: '2018-09-11 04:31:36',
      updatedAt: '2018-09-11 04:31:36'
    },
    {
      grocery: 2,
      amount: 5,
      createdAt: '2018-09-11 04:31:36',
      updatedAt: '2018-09-11 04:31:36'
    }], {});

    return queryInterface.bulkInsert('groceries', [
    {
      name: 'Milk',
      createdAt: '2018-09-11 04:31:36',
      updatedAt: '2018-09-11 04:31:36'
    },
    {
      name: 'Eggs',
      createdAt: '2018-09-11 04:31:36',
      updatedAt: '2018-09-11 04:31:36'
    },
    {
      name: 'Ground Beef',
      createdAt: '2018-09-11 04:31:36',
      updatedAt: '2018-09-11 04:31:36'
    },
    {
      name: 'Butter',
      createdAt: '2018-09-11 04:31:36',
      updatedAt: '2018-09-11 04:31:36'
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
