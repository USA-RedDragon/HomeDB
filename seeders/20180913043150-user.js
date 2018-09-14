'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      name: 'Jacob McSwain',
      username: 'USA-RedDragon',
      password: '$2a$10$vbsqn.yt3c8KS/eCemxs/engvdkjPHKxRSK6CfofK.POSUGJGtrAa',
      email: 'jacob.a.mcswain@gmail.com',
      phone_number: '4055171253',
      admin: true,
      createdAt: '2018-09-11 04:31:36',
      updatedAt: '2018-09-11 04:31:36'
    }], {});
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
