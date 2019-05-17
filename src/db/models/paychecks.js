/* eslint-disable new-cap */

module.exports = function(sequelize, DataTypes) {
    const paychecks = sequelize.define('paychecks', {
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
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    }, {
        tableName: 'paychecks',
    });

    paychecks.associate = function(models) {
        models.paychecks.belongsTo(models.accounts);
    };

    return paychecks;
};
