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
      var transactions = await Transactions.findAll({ limit: request.query.limit, order: [['date', 'DESC']] });

      var cardAdded = [];
      for (var i = 0, len = transactions.length; i < len; i++) {
        var transaction_types = await Type.findOne({ where: { id: transactions[i].type }});
        transactions[i].type = transaction_types.name;
        cardAdded.push(transactions[i]);
      }
      var transformed = [];
      for (var i = 0, len = cardAdded.length; i < len; i++) {
        var cards = await Account.findOne({ where: { id: cardAdded[i].card }});
        cardAdded[i].card = cards.name;
        transformed.push(cardAdded[i]);
      }
      return transformed;
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
    path: '/api/transactionTypes',
    handler: async (request, h) => {
      const Type = request.getModel('transaction_types');
      var types = await Type.findAll();
      return types;
    }
  },
  {
    method: 'GET',
    path: '/api/transaction/{id}',
    handler: async (request, h) => {
      const Type = request.getModel('transaction_types');
      const Account = request.getModel('accounts');
      const Transactions = request.getModel('transactions');
      var transaction = await Transactions.findOne({ where: { id: request.params.id }});

      var transaction_types = await Type.findOne({ where: { id: transaction.type }});
      transaction.type = transaction_types.name;

      var cards = await Account.findOne({ where: { id: transaction.card }});
      transaction.card = cards.name;

      return transaction;
    }
  },
  {
    method: 'POST',
    path: '/api/transaction',
    handler: async (request, h) => {
      var card = await request.getModel('accounts').findOne({ where: { name: request.payload.card }});
      var type = await request.getModel('transaction_types').findOne({ where: { name: request.payload.type }});

      var transaction = await request.getModel('transactions').create({
        place: request.payload.place,
        type: type.id,
        date: request.payload.date,
        amount: request.payload.amount,
        card: card.id,
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
        type: Joi.string().required(),
        card: Joi.string().required(),
        date: Joi.date().required(),
        amount: Joi.number().required(),
        notes: Joi.string()
      }
    },
  }
  },
  {
    method: 'PUT',
    path: '/api/transaction/{id}',
    handler: async (request, h) => {
      const transaction = await request.getModel('transactions').findById(request.params.id);
      var card = await request.getModel('accounts').findOne({ where: { name: request.payload.card }});
      var type = await request.getModel('transaction_types').findOne({ where: { name: request.payload.type }});

      request.payload.card = card.id;
      request.payload.type = type.id
      await transaction.update(request.payload);

      return h.response().code(204);
  },
  options: {
    validate: {
      options: {
        stripUnknown: true
      },
      payload: {
        place: Joi.string().required(),
        type: Joi.string().required(),
        card: Joi.string().required(),
        date: Joi.date().required(),
        amount: Joi.number().required(),
        notes: Joi.string()
      }
    },
  }
  },
  {
    method: 'DELETE',
    path: '/api/transaction/{id}',
    handler: async (request, h) => {
      if(!request.auth.credentials.admin){
        return h.response().code(403);
      }
      
      const transactions = request.getModel('transactions');
      return transactions.destroy({
        where: { id: request.params.id }
      }).then(() => {
        return h.response().code(204);
      });
    }
  }
];