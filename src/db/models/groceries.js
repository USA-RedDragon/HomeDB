/* eslint-disable new-cap */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('groceries', {
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
    }, {
        tableName: 'groceries',
    });
};
