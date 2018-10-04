'use strict';

const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/transactions',
    handler: async (request, h) => {
      const Type = request.getModel('transaction_types');
      const Account = request.getModel('accounts');
      const Transactions = request.getModel('transactions');
      var transactions = await Transactions.findAll({
        include: [
          { model: Type,
            as: "transaction_type",
            required: true
          },
          { model: Account,
            as: "account",
            required: true
          }
        ],
        limit: request.query.limit, order: [['date', 'DESC']]
      });

      return transactions;
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
    path: '/api/transaction/{id}',
    handler: async (request, h) => {
      const Type = request.getModel('transaction_types');
      const Account = request.getModel('accounts');
      const Transactions = request.getModel('transactions');

      var transaction = await Transactions.findOne({
        include: [
          { model: Type,
            as: "transaction_type",
            required: true
          },
          { model: Account,
            as: "account",
            required: true
          }
        ],
        where: { id: request.params.id}
      });

      return transaction;
    }
  },
  {
    method: 'POST',
    path: '/api/transaction',
    handler: async (request, h) => {

      var transaction = await request.getModel('transactions').create({
        place: request.payload.place,
        transactionTypeId: request.payload.type,
        date: request.payload.date,
        amount: request.payload.amount,
        accountId: request.payload.card,
        notes: request.payload.notes
      });

      return transaction;
  },
  options: {
    validate: {
      options: {
        stripUnknown: true
      },
      payload: {
        place: Joi.string().required(),
        type: Joi.number().required(),
        card: Joi.number().required(),
        date: Joi.date().required(),
        amount: Joi.number().required(),
        notes: Joi.string().allow('').optional()
      }
    },
  }
  },
  {
    method: 'PUT',
    path: '/api/transaction/{id}',
    handler: async (request, h) => {
      const transaction = await request.getModel('transactions').findById(request.params.id);
      await transaction.update({
        place: request.payload.place,
        transactionTypeId: request.payload.type,
        date: request.payload.date,
        amount: request.payload.amount,
        accountId: request.payload.card,
        notes: request.payload.notes
      });
      return h.response().code(204);
  },
  options: {
    validate: {
      options: {
        stripUnknown: true
      },
      payload: {
        place: Joi.string().required(),
        type: Joi.number().required(),
        card: Joi.number().required(),
        date: Joi.date().required(),
        amount: Joi.number().required(),
        notes: Joi.string().allow('').optional()
      }
    },
  }
  },
  {
    method: 'DELETE',
    path: '/api/transaction/{id}',
    handler: async (request, h) => {
      const transactions = request.getModel('transactions');
      var transaction = await transactions.findById(request.params.id);

      return transaction.destroy({}).then(() => {
        return h.response().code(204);
      });
    }
  }
];