/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var grocery_list = sequelize.define('grocery_list', {
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
    tableName: 'grocery_list'
  });

  grocery_list.associate = function(models) {
    models.grocery_list.belongsTo(models.groceries);
  };

  return grocery_list;
};
