/* eslint-disable new-cap */

module.exports = function(sequelize, DataTypes) {
    const accounts = sequelize.define('accounts', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        balance: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        routing_number: {
            type: DataTypes.STRING(9),
            allowNull: true,
        },
        account_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        plaid_access_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        plaid_item_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: 'accounts',
        defaultScope: {
            attributes: { exclude: ['plaid_access_token', 'plaid_item_id'] },
        },
    });

    return accounts;
};
