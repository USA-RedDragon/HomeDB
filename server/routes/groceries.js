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
            var groceries = await GroceryList.findAll({
                include: [{
                    model: Groceries,
                    required: true,
                    as: "grocery"
                }]
            });

            return groceries;
        }
    },
    {
        method: 'GET',
        path: '/api/default_groceries',
        handler: async (request, h) => {
            const Groceries = request.getModel('groceries');
            const DefaultGroceries = request.getModel('default_groceries');
            var groceries = await DefaultGroceries.findAll({
                include: [{
                    model: Groceries,
                    required: true,
                    as: "grocery"
                }]
            });
            return groceries;
        }
    },
    {
        method: 'POST',
        path: '/api/generate_groceries',
        handler: async (request, h) => {
            const DefaultGroceries = request.getModel('default_groceries');
            const GroceryList = request.getModel('grocery_list');
            const Groceries = request.getModel('groceries');
            var defaultGroceries = await DefaultGroceries.findAll({});

            await GroceryList.destroy({
                where: {},
                truncate: true
            });

            for (var i = 0, len = defaultGroceries.length; i < len; i++) {
                await GroceryList.create({
                    groceryId: defaultGroceries[i].groceryId,
                    amount: defaultGroceries[i].amount
                });
            }

            var grocery_list = await GroceryList.findAll({
                include: [{
                    model: Groceries,
                    required: true,
                    as: "grocery"
                }]
            });
            
            return grocery_list;
        }
    },
    {
        method: 'DELETE',
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
        method: 'DELETE',
        path: '/api/clear_default_groceries',
        handler: async (request, h) => {
            await request.getModel('default_groceries').destroy({
                where: {},
                truncate: true
            });

            return h.response().code(204);
        }
    },
    {
        method: 'POST',
        path: '/api/default_grocery_list',
        handler: async (request, h) => {
            const Groceries = request.getModel('groceries');
            const DefaultGroceryList = request.getModel('default_groceries');

            await DefaultGroceryList.create({
                groceryId: request.payload.id,
                amount: request.payload.amount
            });

            var default_groceries = await DefaultGroceryList.findAll({
                include: [{
                    model: Groceries,
                    required: true,
                    as: 'grocery'
                }]
            });

            return default_groceries;
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
        method: 'POST',
        path: '/api/grocery_list',
        handler: async (request, h) => {
            const Groceries = request.getModel('groceries');
            const GroceryList = request.getModel('grocery_list');
                        
            await GroceryList.create({
                groceryId: request.payload.id,
                amount: request.payload.amount
            });

            var groceries = await GroceryList.findAll({
                include: [{
                    model: Groceries,
                    required: true,
                    as: 'grocery'
                }]
            });

            return groceries;
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
    },
    {
        method: 'POST',
        path: '/api/groceries',
        handler: async (request, h) => {
            const Groceries = request.getModel('groceries');
                        
            var grocery = await Groceries.create({
                name: request.payload.name,
            });
            return grocery;
        },
        options: {
            validate: {
              options: {
                stripUnknown: true
              },
              payload: {
                name: Joi.string().required()
              }
            },
        }
    }
];