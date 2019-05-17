/* eslint-disable new-cap */

module.exports = function(sequelize, DataTypes) {
    const debts = sequelize.define('debts', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
    }, {
        tableName: 'debts',
    });

    return debts;
};
