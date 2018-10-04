'use strict';

const Joi = require('joi');
const bcrypt = require('bcrypt');

module.exports = [
  {
    method: 'GET',
    path: '/api/debts',
    handler: async (request, h) => {
      const Account = request.getModel('accounts');
      const Debts = request.getModel('debts');

      var debts = Debts.findAll({
        include: [
          { model: Account,
            as: "account",
            required: true
          }
        ],
        limit: request.query.limit
      });
      return debts;
    },
    options: {
      validate: {
          query: {
              limit: Joi.number().integer().min(1).max(100).default(50000)
          }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/debt/{id}',
    handler: async (request, h) => {
      const Account = request.getModel('accounts');
      var debt = await request.getModel('debts').findOne({
        where: { id: request.params.id },
        include: [{
          model: Account,
          required: true,
          as: "account"
        }]
      });

      return debt;
    }
  },
  {
    method: 'POST',
    path: '/api/debt',
    handler: async (request, h) => {
      var debt = await request.getModel('debts').create({
        amount: request.payload.amount,
        accountId: request.payload.account,
        name: request.payload.name
      });

      return debt;
  },
  options: {
    validate: {
      options: {
        stripUnknown: true
      },
      payload: {
        account: Joi.number().required(),
        name: Joi.string().required(),
        amount: Joi.number().required()
      }
    },
  }
  },
  {
    method: 'PUT',
    path: '/api/debt/{id}',
    handler: async (request, h) => {
      const debt = await request.getModel('debts').findById(request.params.id);
      await debt.update({
        amount: request.payload.amount,
        accountId: request.payload.account,
        name: request.payload.name
      });

      return h.response().code(204);
  },
  options: {
    validate: {
      options: {
        stripUnknown: true
      },
      payload: {
        account: Joi.number().required(),
        name: Joi.string().required(),
        amount: Joi.number().required()
      }
    },
  }
  },
  {
    method: 'DELETE',
    path: '/api/debt/{id}',
    handler: async (request, h) => {
      const debts = request.getModel('debts');
      return debts.destroy({
        where: { id: request.params.id }
      }).then(() => {
        return h.response().code(204);
      });
    }
  }
];