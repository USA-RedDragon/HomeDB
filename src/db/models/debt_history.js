/* eslint-disable new-cap */

module.exports = function(sequelize, DataTypes) {
    const debtHistory = sequelize.define('debt_history', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        balance: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    }, {
        tableName: 'debt_history',
        timestamps: false,
    });

    debtHistory.associate = function(models) {
        models.debt_history.belongsTo(models.debts);
    };

    return debtHistory;
};
