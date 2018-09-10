/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('debts', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    account: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'accounts',
        key: 'id'
      }
    }
  }, {
    tableName: 'debts'
  });
};
