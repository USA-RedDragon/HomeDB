'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('transaction_types', [{
        name: 'Groceries',
        createdAt: '2018-09-11 04:31:36',
        updatedAt: '2018-09-11 04:31:36'
    }], {});

    await queryInterface.bulkInsert('accounts', [{
        name: 'TFCU',
        balance: 4.23,
        routing_number: '000000000',
        account_number: '0000000000',
        createdAt: '2018-09-11 04:31:36',
        updatedAt: '2018-09-11 04:31:36'
    }], {});

    const transaction_types = await queryInterface.sequelize.query(
        'SELECT id from transaction_types;'
    );

    const cards = await queryInterface.sequelize.query(
        'SELECT id from accounts;'
    );
  
    await queryInterface.bulkInsert('transactions', [{
      type: transaction_types[0][0].id,
      place: 'Walmart',
      date: '2018-09-11',
      amount: 123.11,
      card: cards[0][0].id,
      notes: "I didn't spend _that_ much",
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
