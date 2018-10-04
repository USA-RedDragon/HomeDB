/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var meal_groceries = sequelize.define('meal_groceries', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    tableName: 'meal_groceries'
  });

  meal_groceries.associate = function(models) {
    models.meal_groceries.belongsTo(models.meals);
    models.meal_groceries.belongsTo(models.groceries);
  };

  return meal_groceries;
};
