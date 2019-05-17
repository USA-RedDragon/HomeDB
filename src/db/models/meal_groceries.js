/* eslint-disable new-cap */

module.exports = function(sequelize, DataTypes) {
    const mealGroceries = sequelize.define('meal_groceries', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        amount: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
    }, {
        tableName: 'meal_groceries',
    });

    mealGroceries.associate = function(models) {
        models.meal_groceries.belongsTo(models.meals);
        models.meal_groceries.belongsTo(models.groceries);
    };

    return mealGroceries;
};
