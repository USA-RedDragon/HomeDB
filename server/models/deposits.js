/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const deposits = sequelize.define('deposits', {
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
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    note: {
      type: DataTypes.STRING(5000),
      allowNull: false
    }
  }, {
    tableName: 'deposits'
  });

  deposits.associate = function(models) {
    models.deposits.belongsTo(models.accounts);
  };

  return deposits;
};
