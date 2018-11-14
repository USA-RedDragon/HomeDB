const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 100,
    min: 0,
    acquire: 120000,
    idle: 120000,
    evict: 120000
  },
  dialectOptions: {
    connectTimeout: 60000,
    decimalNumbers: true
  }
});

module.exports = sequelize;