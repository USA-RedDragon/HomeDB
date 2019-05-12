/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var debt_history = sequelize.define('debt_history', {
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
      tableName: 'debt_history',
      timestamps: false
    });

    debt_history.associate = function(models) {
        models.debt_history.belongsTo(models.debts);
    };

    return debt_history;
  };
  