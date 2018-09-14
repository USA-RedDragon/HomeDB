/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('default_groceries', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    grocery: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'default_groceries'
  });
};
