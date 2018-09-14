'use strict';

const Joi = require('joi');
const bcrypt = require('bcrypt');

module.exports = [
  {
    method: 'GET',
    path: '/api/transactions',
    handler: async (request, h) => {
      const Type = request.getModel('transaction_types');
      const Account = request.getModel('accounts');
      const Transactions = request.getModel('transactions');
      var transactions = await Transactions.findAll({ limit: 5 });

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
    path: '/api/accounts',
    handler: async (request, h) => {
      const Card = request.getModel('accounts');
      var cards = await Card.findAll();
      return cards;
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
      var transaction = await request.getModel('transactions').create({
        place: request.payload.place,
        type: request.payload.type,
        date: request.payload.date,
        amount: request.payload.amount,
        card: request.payload.card,
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
        notes: Joi.string().required()
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