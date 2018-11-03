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
    var query =
      "CREATE TRIGGER `account_history` AFTER UPDATE ON `accounts`\n" +
      "FOR EACH ROW BEGIN\n" +
      "IF (SELECT count(*) FROM account_history WHERE accountId=NEW.id AND date=CURDATE()) = 1\n" +
	    "THEN\n" +
		  "UPDATE account_history SET balance=NEW.balance WHERE accountId=NEW.id AND date=CURDATE();\n" +
      "ELSE\n" +
		  "INSERT INTO account_history (date, balance, accountId) VALUES (CURDATE(), NEW.balance, NEW.id);\n" +
	    "END IF;\n" +
      "END"
    await queryInterface.sequelize.query(query);
    query =
      "CREATE TRIGGER `debt_history` AFTER UPDATE ON `debts` FOR EACH ROW BEGIN\n" +
      "IF (SELECT count(*) FROM debt_history WHERE debtId=NEW.id AND MONTH(date)=MONTH(CURDATE())) = 1\n" +
      "THEN\n" +
      "UPDATE debt_history SET balance=NEW.amount\n" +
      "WHERE debtId=NEW.id AND MONTH(date)=MONTH(CURDATE());\n" +
      "ELSE\n" +
      "INSERT INTO debt_history (date, balance, debtId) VALUES (CURDATE(), NEW.amount, NEW.id);\n" +
      "END IF;\n" +
      "END"
      await queryInterface.sequelize.query(query);
  }
};
