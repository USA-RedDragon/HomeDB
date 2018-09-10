/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('deposits', {
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
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    account: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'accounts',
        key: 'id'
      }
    },
    note: {
      type: DataTypes.STRING(5000),
      allowNull: false
    }
  }, {
    tableName: 'deposits'
  });
};
