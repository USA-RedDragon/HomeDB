/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('paychecks', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    account: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    tableName: 'paychecks'
  });
};
