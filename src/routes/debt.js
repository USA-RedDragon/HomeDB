'use strict';

const Joi = require('joi');
const bcrypt = require('bcrypt');

module.exports = [
  {
    method: 'GET',
    path: '/api/debts',
    handler: async (request, h) => {
      const Debts = request.getModel('debts');

      var debts = Debts.findAll({
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
      var debt = await request.getModel('debts').findOne({
        where: { id: request.params.id }
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