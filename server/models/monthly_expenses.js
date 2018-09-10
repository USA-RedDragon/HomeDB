/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('monthly_expenses', {
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
    planned: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    actual: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    month: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'monthly_expenses'
  });
};
