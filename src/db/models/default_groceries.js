/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const default_groceries = sequelize.define('default_groceries', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
  }, {
    tableName: 'default_groceries'
  });

  default_groceries.associate = function(models) {
    models.default_groceries.belongsTo(models.groceries);
  };

  return default_groceries;
};
