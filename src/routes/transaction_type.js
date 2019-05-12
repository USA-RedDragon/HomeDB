'use strict';

const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/transaction_types',
    handler: async (request, h) => {
      const Type = request.getModel('transaction_types');
      var types = await Type.findAll();
      return types;
    }
  },
  {
    method: 'GET',
    path: '/api/transaction_type/{id}',
    handler: async (request, h) => {
      const Type = request.getModel('transaction_types');
      var transaction_type = await Type.findOne({ where: { id: request.params.id }});
      return transaction_type;
    }
  },
  {
    method: 'POST',
    path: '/api/transaction_type',
    handler: async (request, h) => {
      var type = await request.getModel('transaction_types').create(request.payload);
      return type;
  },
  options: {
    validate: {
      options: {
        stripUnknown: true
      },
      payload: {
        name: Joi.string().required(),
      }
    },
  }
  },
  {
    method: 'PUT',
    path: '/api/transaction_type/{id}',
    handler: async (request, h) => {
      var type = await request.getModel('transaction_types').findOne({ where: { id: request.params.id }});
      await type.update(request.payload);

      return h.response().code(204);
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
  },
  {
    method: 'DELETE',
    path: '/api/transaction_type/{id}',
    handler: async (request, h) => {
      const transaction_types = request.getModel('transaction_types');
      return transaction_types.destroy({
        where: { id: request.params.id }
      }).then(() => {
        return h.response().code(204);
      });
    }
  }
];