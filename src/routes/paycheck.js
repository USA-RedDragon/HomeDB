'use strict';

const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

module.exports = [
  {
    method: 'GET',
    path: '/api/paychecks',
    handler: async (request, h) => {
      const Paychecks = await request.getModel('paychecks');

      var paychecks = await Paychecks.findAll({
        limit: request.query.limit
      });
      return paychecks;
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
    path: '/api/paycheck/{id}',
    handler: async (request, h) => {
      var paycheck = await request.getModel('paychecks').findOne({
        where: { id: request.params.id }
      });

      return paycheck;
    }
  },
  {
    method: 'POST',
    path: '/api/paycheck',
    handler: async (request, h) => {
      var paycheck = await request.getModel('paychecks').create({
        amount: request.payload.amount,
        date: request.payload.date,
        accountId: request.payload.account
      });
      var account = await request.getModel('accounts').findOne({
        where: { id: request.payload.account }
      })
      account.update({balance: account.balance + request.payload.amount})
      return paycheck;
  },
  options: {
    validate: {
      options: {
        stripUnknown: true
      },
      payload: {
        date: Joi.date().format('YYYY-MM-DD').required(),
        amount: Joi.number().required(),
        account: Joi.number().required()
      }
    },
  }
  },
  {
    method: 'PUT',
    path: '/api/paycheck/{id}',
    handler: async (request, h) => {
      const paycheck = await request.getModel('paychecks').findById(request.params.id);

      var account = await request.getModel('accounts').findOne({
        where: { id: paycheck.accountId }
      });

      account.update({balance: account.balance - paycheck.amount})

      paycheck.update({
        amount: request.payload.amount,
        date: request.payload.date,
        accountId: request.payload.account
      });

      account = await request.getModel('accounts').findOne({
        where: { id: request.payload.account }
      });

      account.update({balance: account.balance + paycheck.amount})

      return h.response().code(204);
  },
  options: {
    validate: {
      options: {
        stripUnknown: true
      },
      payload: {
        date: Joi.date().format('YYYY-MM-DD').required(),
        amount: Joi.number().required(),
        account: Joi.number().required()
      }
    },
  }
  },
  {
    method: 'DELETE',
    path: '/api/paycheck/{id}',
    handler: async (request, h) => {
      const paychecks = await request.getModel('paychecks');

      var paycheck = await paychecks.findOne({
        where: { id: request.params.id }
      });
      var account = await request.getModel('accounts').findOne({
          where: { id: paycheck.accountId }
      });
      account.update({balance: account.balance - paycheck.amount})
      paycheck.destroy()
      return h.response().code(204);
    }
  }
];