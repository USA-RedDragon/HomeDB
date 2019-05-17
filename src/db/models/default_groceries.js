/* eslint-disable new-cap */

module.exports = function(sequelize, DataTypes) {
    const defaultGroceries = sequelize.define('default_groceries', {
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
    }, {
        tableName: 'default_groceries',
    });

    defaultGroceries.associate = function(models) {
        models.default_groceries.belongsTo(models.groceries);
    };

    return defaultGroceries;
};
