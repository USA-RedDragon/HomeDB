/* eslint-disable new-cap */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('meals', {
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
        notes: {
            type: DataTypes.STRING(5000),
            allowNull: false,
        },
    }, {
        tableName: 'meals',
    });
};
