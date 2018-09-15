'use strict';

const Joi = require('joi');
const bcrypt = require('bcrypt');

module.exports = [
    {
        method: 'GET',
        path: '/api/grocery_list',
        handler: async (request, h) => {
            const Groceries = request.getModel('groceries');
            const GroceryList = request.getModel('grocery_list');
            var groceries = await GroceryList.findAll({});

            var nameAdded = [];
            for (var i = 0, len = groceries.length; i < len; i++) {
                var grocery = await Groceries.findOne({ where: { id: groceries[i].grocery } });
                nameAdded.push(groceries[i].toJSON());
                nameAdded[i].name = grocery.name;
            }

            return nameAdded;
        }
    },
    {
        method: 'GET',
        path: '/api/generate_groceries',
        handler: async (request, h) => {
            const DefaultGroceries = request.getModel('default_groceries');
            const GroceryList = request.getModel('grocery_list');
            const Groceries = request.getModel('groceries');
            var defaultGroceries = await DefaultGroceries.findAll({});

            await request.getModel('grocery_list').destroy({
                where: {},
                truncate: true
            });

            for (var i = 0, len = defaultGroceries.length; i < len; i++) {
                await GroceryList.create({
                    grocery: defaultGroceries[i].grocery,
                    amount: defaultGroceries[i].amount
                });
            }

            var grocery_list = await GroceryList.findAll({});
            var new_groceries = [];
            for (var i = 0, len = grocery_list.length; i < len; i++) {
                var grocery = await Groceries.findOne({ where: { id: grocery_list[i].grocery } });
                new_groceries.push(grocery_list[i].toJSON());
                new_groceries[i].name = grocery.name;
                console.log(new_groceries[i]);
            }
            return new_groceries;
        }
    },
    {
        method: 'GET',
        path: '/api/clear_groceries',
        handler: async (request, h) => {
            await request.getModel('grocery_list').destroy({
                where: {},
                truncate: true
            });

            return h.response().code(204);
        }
    },
    {
        method: 'POST',
        path: '/api/grocery_list',
        handler: async (request, h) => {
            const Groceries = request.getModel('groceries');
            const GroceryList = request.getModel('grocery_list');
                        
            await GroceryList.create({
                grocery: request.payload.id,
                amount: request.payload.amount
            });

            var groceries = await GroceryList.findAll({});
            var nameAdded = [];
            for (var i = 0, len = groceries.length; i < len; i++) {
                var grocery = await Groceries.findOne({ where: { id: groceries[i].grocery } });
                nameAdded.push(groceries[i].toJSON());
                nameAdded[i].name = grocery.name;
            }

            return nameAdded;
        },
        options: {
            validate: {
              options: {
                stripUnknown: true
              },
              payload: {
                id: Joi.number().required(),
                amount: Joi.number().required()
              }
            },
        }
    },
    {
        method: 'GET',
        path: '/api/groceries',
        handler: async (request, h) => {
            const Groceries = request.getModel('groceries');
            var groceries = await Groceries.findAll({});

            return groceries;
        }
    }
];