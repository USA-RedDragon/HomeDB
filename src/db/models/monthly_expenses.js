/* eslint-disable new-cap */

module.exports = function(sequelize, DataTypes) {
    const monthlyExpenses = sequelize.define('monthly_expenses', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        planned: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        actual: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        month: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    }, {
        tableName: 'monthly_expenses',
    });

    monthlyExpenses.associate = function(models) {
        models.monthly_expenses.belongsTo(models.expense_type);
    };

    return monthlyExpenses;
};
