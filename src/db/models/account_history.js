/* eslint-disable new-cap */

module.exports = function(sequelize, DataTypes) {
    const accountHistory = sequelize.define('account_history', {
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
        tableName: 'account_history',
        timestamps: false,
    });

    accountHistory.associate = function(models) {
        models.account_history.belongsTo(models.accounts);
    };

    return accountHistory;
};
