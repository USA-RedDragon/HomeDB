/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sessions', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: 'id'
      }
    }
  }, {
    tableName: 'sessions'
  });
};
