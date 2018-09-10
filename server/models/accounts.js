/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accounts', {
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
    routing_number: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    account_number: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    tableName: 'accounts'
  });
};
