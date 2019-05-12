'use strict';

const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

module.exports = [
  {
    method: 'GET',
    path: '/api/transactions',
    handler: async (request, h) => {
      const Type = request.getModel('transaction_types');
      const Account = request.getModel('accounts');
      const Transactions = request.getModel('transactions');
      const Debt = request.getModel('debts');

      var transactions = await Transactions.findAll({
        include: [
          { model: Type,
            as: "transaction_type",
            required: true
          },
          { model: Account,
            as: "account",
            required: true
          },
          { model: Debt,
            as: "debt",
            required: false
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
      const Debt = request.getModel('debts');

      var transaction = await Transactions.findOne({
        include: [
          { model: Type,
            as: "transaction_type",
            required: true
          },
          { model: Account,
            as: "account",
            required: true
          },
          { model: Debt,
            as: "debt",
            required: false
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

      var account = await request.getModel('accounts').findOne({ where: { id: request.payload.card } });
      await account.update({balance: account.balance - request.payload.amount})

      if(request.payload.isDebt) {
        var debt = await request.getModel('debts').findOne({ where: { id: request.payload.debt } });
        debt.update({amount: debt.amount - request.payload.amount});
      }

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
        date: Joi.date().format('YYYY-MM-DD').required(),
        amount: Joi.number().required(),
        notes: Joi.string().allow('').optional(),
        debt: Joi.number().required(),
        isDebt: Joi.boolean().required()
      }
    },
  }
  },
  {
    method: 'PUT',
    path: '/api/transaction/{id}',
    handler: async (request, h) => {
      const transaction = await request.getModel('transactions').findById(request.params.id);
      var account = await request.getModel('accounts').findOne({ where: { id: transaction.accountId } });
      await account.update({balance: account.balance + transaction.amount})

      account = await request.getModel('accounts').findOne({ where: { id: request.payload.card } });
      await account.update({balance: account.balance - request.payload.amount})

      if(request.payload.isDebt) {
        if(transaction.debtId != null) {
          var debt = await request.getModel('debts').findOne({ where: { id: transaction.debtId } });
          await debt.update({amount: debt.amount + transaction.amount})
        }
        var debt = await request.getModel('debts').findOne({ where: { id: request.payload.debt } });
        debt.update({amount: debt.amount - request.payload.amount});
      }

      await transaction.update({
        place: request.payload.place,
        transactionTypeId: request.payload.type,
        date: request.payload.date,
        amount: request.payload.amount,
        accountId: request.payload.card,
        notes: request.payload.notes,
        isDebtPayment: request.payload.isDebt,
        debtId: request.payload.debt
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
        date: Joi.date().format('YYYY-MM-DD').required(),
        amount: Joi.number().required(),
        notes: Joi.string().allow('').optional(),
        isDebt: Joi.boolean().required(),
        debt: Joi.number().allow(null)
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

      var account = await request.getModel('accounts').findOne({ where: { id: transaction.accountId } });
      await account.update({balance: account.balance + transaction.amount})

      if(transaction.debtId != null) {
        var debt = await request.getModel('debts').findOne({ where: { id: transaction.debtId } });
        await debt.update({amount: debt.amount + transaction.amount})
      }

      await transaction.destroy({})

      return h.response().code(204);
    }
  }
];