/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var transactions = sequelize.define('transactions', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    place: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING(5000),
      allowNull: true
    }
  }, {
    tableName: 'transactions'
  });

  transactions.associate = function(models) {
    models.transactions.belongsTo(models.transaction_types);
    models.transactions.belongsTo(models.accounts);
  };

  return transactions;
};
