/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var account_history = sequelize.define('account_history', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      balance: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      }
    }, {
      tableName: 'account_history',
      timestamps: false
    });

    account_history.associate = function(models) {
        models.account_history.belongsTo(models.accounts);
    };

    return account_history;
  };
  