/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const accounts = sequelize.define('accounts', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    balance: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    routing_number: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    account_number: {
      type: DataTypes.STRING(12),
      allowNull: true
    }
  }, {
    tableName: 'accounts'
  });

  return accounts;
};
