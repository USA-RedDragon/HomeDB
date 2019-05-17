/* eslint-disable new-cap */

module.exports = function(sequelize, DataTypes) {
    const groceryList = sequelize.define('grocery_list', {
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
        tableName: 'grocery_list',
    });

    groceryList.associate = function(models) {
        models.grocery_list.belongsTo(models.groceries);
    };

    return groceryList;
};
