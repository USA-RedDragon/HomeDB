/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
  }, {
    tableName: 'users'
  });
};
