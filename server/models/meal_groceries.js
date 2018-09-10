/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('meal_groceries', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    meal: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'meals',
        key: 'id'
      }
    },
    item: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'groceries',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    tableName: 'meal_groceries'
  });
};
