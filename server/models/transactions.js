/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactions', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    place: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    card: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING(5000),
      allowNull: true
    }
  }, {
    tableName: 'transactions'
  });
};
