/* eslint-disable new-cap */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('home_items', {
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
        note: {
            type: DataTypes.STRING(5000),
            allowNull: false,
        },
        obtained: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0',
        },
    }, {
        tableName: 'home_items',
    });
};
