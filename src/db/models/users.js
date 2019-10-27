/* eslint-disable new-cap */
const argon2 = require('argon2');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users', {
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
        username: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0',
        },
    }, {
        tableName: 'users',
        hooks: {
            beforeSave: (user) => {
                if (user.changed('password')) {
                    return argon2.hash(user.password).then((hash) => {
                        user.password = hash;
                    });
                }
            },
        },
        defaultScope: {
            attributes: { exclude: ['password'] },
        },
    });
};
