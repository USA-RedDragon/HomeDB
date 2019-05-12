'use strict';

const Joi = require('joi');
const bcrypt = require('bcrypt');

module.exports = [
  {
    method: 'GET',
    path: '/api/accounts',
    handler: async (request, h) => {
      const Card = request.getModel('accounts');
      var cards = await Card.findAll();
      return cards;
    }
  },
  {
    method: 'GET',
    path: '/api/account/{id}',
    handler: async (request, h) => {
      const Account = request.getModel('accounts');
      var account = await Account.findOne({ where: { id: request.params.id }});

      return account;
    }
  },
  {
    method: 'POST',
    path: '/api/account',
    handler: async (request, h) => {
      var account = await request.getModel('accounts').create({
        name: request.payload.name,
        balance: request.payload.balance,
        account_number: request.payload.account_number,
        routing_number: request.payload.routing_number
      });

      return account;
  },
  options: {
    validate: {
      options: {
        stripUnknown: true
      },
      payload: {
        name: Joi.string().required(),
        balance: Joi.number().required(),
        account_number: Joi.string().required(),
        routing_number: Joi.string().required()
      }
    },
  }
  },
  {
    method: 'PUT',
    path: '/api/account/{id}',
    handler: async (request, h) => {
      var account = await request.getModel('accounts').findOne({ where: { id: request.params.id }});

      await account.update(request.payload);

      return h.response().code(204);
  },
  options: {
    validate: {
      options: {
        stripUnknown: true
      },
      payload: {
        name: Joi.string().required(),
        balance: Joi.number().required(),
        account_number: Joi.string().required(),
        routing_number: Joi.string().required()
      }
    },
  }
  },
  {
    method: 'DELETE',
    path: '/api/account/{id}',
    handler: async (request, h) => {
      const accounts = request.getModel('accounts');
      return accounts.destroy({
        where: { id: request.params.id }
      }).then(() => {
        return h.response().code(204);
      });
    }
  }
];