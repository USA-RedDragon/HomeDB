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
      var debts;
      if(request.params.limit) {
        debts = await Debts.findAll({ limit: request.params.limit });
      } else {
        debts = await Debts.findAll();
      }

      var accountAdded = [];
      for (var i = 0, len = debts.length; i < len; i++) {
        var account = await Account.findOne({ where: { id: debts[i].account }});
        debts[i].account = account.name;
        accountAdded.push(debts[i]);
      }
      
      return accountAdded;
    }
  },
  {
    method: 'GET',
    path: '/api/debt/{id}',
    handler: async (request, h) => {
      const Account = request.getModel('accounts');
      var debt = await request.getModel('debts').findOne({ where: { id: request.params.id }});

      var account = await Account.findOne({ where: { id: debt.account }});
      debt.account = account.name;

      return debt;
    }
  },
  {
    method: 'POST',
    path: '/api/debt',
    handler: async (request, h) => {
      var account = await request.getModel('accounts').findOne({ where: { name: request.payload.account }});

      var debt = await request.getModel('debts').create({
        amount: request.payload.amount,
        account: account.id,
        name: request.payload.name,
      });

      return debt;
  },
  options: {
    validate: {
      options: {
        stripUnknown: true
      },
      payload: {
        account: Joi.string().required(),
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
      var account = await request.getModel('accounts').findOne({ where: { name: request.payload.account }});

      request.payload.account = account.id;
      await debt.update(request.payload);

      return h.response().code(204);
  },
  options: {
    validate: {
      options: {
        stripUnknown: true
      },
      payload: {
        account: Joi.string().required(),
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