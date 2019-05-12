/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var monthly_expenses = sequelize.define('monthly_expenses', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    planned: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    actual: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    month: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'monthly_expenses'
  });

  monthly_expenses.associate = function(models) {
    models.monthly_expenses.belongsTo(models.expense_type);
  };

  return monthly_expenses;
};
