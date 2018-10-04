/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const expense_type = sequelize.define('expense_type', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    tableName: 'expense_type'
  });

  return expense_type;
};
