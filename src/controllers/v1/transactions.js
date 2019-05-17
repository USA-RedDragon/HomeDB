module.exports.GETAPITransactionsTypes = (req, res) => {
    req.db.transaction_types.findAll().then((types) => {
        res.json(types);
    });
};

module.exports.GETAPITransactionsTypesId = (req, res) => {
    req.db.transaction_types.findOne({
        where: { id: req.params.id },
    }).then((transactionType) => {
        res.json(transactionType);
    });
};

module.exports.POSTAPITransactionsTypes = (req, res) => {
    req.db.transaction_types.create(req.body).then((type) => {
        res.json(type);
    });
};

module.exports.PUTAPITransactionsTypesId = (req, res) => {
    req.db.transaction_types.findOne({
        where: { id: req.params.id },
    }).then((type) => {
        type.update(req.body).then(() => {
            res.send().status(204);
        });
    });
};

module.exports.DELETEAPITransactionsTypesId = (req, res) => {
    req.db.transaction_types.destroy({
        where: { id: req.params.id },
    }).then(() => {
        res.send().status(204);
    });
};

module.exports.GETAPITransactions = (req, res) => {
    req.db.transactions.findAll({
        include: [
            {
                model: req.db.transaction_types,
                as: 'transaction_type',
                required: true,
            },
            {
                model: req.db.accounts,
                as: 'account',
                required: true,
            },
            {
                model: req.db.debts,
                as: 'debt',
                required: false,
            },
        ],
        limit: Number(req.query.limit) || 500000, order: [['date', 'DESC']],
    }).then((transactions) => {
        res.json(transactions);
    });
};

module.exports.GETAPITransactionsId = (req, res) => {
    req.db.transactions.findOne({
        include: [
            {
                model: req.db.transaction_types,
                as: 'transaction_type',
                required: true,
            },
            {
                model: req.db.accounts,
                as: 'account',
                required: true,
            },
            {
                model: req.db.debts,
                as: 'debt',
                required: false,
            },
        ],
        where: { id: req.params.id },
    }).then((transaction) => {
        res.json(transaction);
    });
};

module.exports.POSTAPITransactions = (req, res) => {
    req.db.transactions.create({
        place: req.body.place,
        transactionTypeId: req.body.type,
        date: req.body.date,
        amount: req.body.amount,
        accountId: req.body.card,
        notes: req.body.notes,
    }).then((transaction) => {
        req.db.accounts.findOne({
            where: { id: req.body.card },
        }).then((account) => {
            account.update({
                balance: Number(account.balance) - Number(req.body.amount),
            }).then(() => {
                if (req.body.isDebt) {
                    req.db.debts.findOne({
                        where: { id: req.body.debt },
                    }).then((debt) => {
                        debt.update({
                            amount: Number(debt.amount) - Number(req.body.amount),
                        });
                    });
                }
                res.json(transaction);
            });
        });
    });
};

module.exports.PUTAPITransactionsId = (req, res) => {
    req.db.transactions.findByPk(req.params.id).then((transaction) => {
        req.db.accounts.findOne({
            where: { id: transaction.accountId },
        }).then((account) => {
            account.update({
                balance: Number(account.balance) + Number(transaction.amount),
            }).then((account) => {
                req.db.accounts.findOne({
                    where: { id: req.body.card },
                }).then((newAccount) => {
                    newAccount.update({
                        balance: Number(account.balance) - Number(req.body.amount),
                    });

                    if (req.body.isDebt) {
                        if (transaction.debtId != null) {
                            req.db.debts.findOne({
                                where: { id: transaction.debtId },
                            }).then((debt) => {
                                debt.update({
                                    amount: Number(debt.amount) + Number(transaction.amount),
                                });
                            });
                        }
                        req.db.debts.findOne({
                            where: { id: req.body.debt },
                        }).then((debt) => {
                            debt.update({
                                amount: Number(debt.amount) - Number(req.body.amount),
                            });
                        });
                    }

                    transaction.update({
                        place: req.body.place,
                        transactionTypeId: req.body.type,
                        date: req.body.date,
                        amount: req.body.amount,
                        accountId: req.body.card,
                        notes: req.body.notes,
                        isDebtPayment: req.body.isDebt,
                        debtId: req.body.debt,
                    }).then(() => {
                        res.send().status(204);
                    });
                });
            });
        });
    });
};

module.exports.DELETEAPITransactionsId = (req, res) => {
    req.db.transactions.findByPk(req.params.id).then((transaction) => {
        req.db.accounts.findOne({
            where: { id: transaction.accountId },
        }).then((account) => {
            account.update({
                balance: Number(account.balance) + Number(transaction.amount),
            });

            if (transaction.debtId != null) {
                creq.db.debts.findOne({
                    where: { id: transaction.debtId },
                }).then((debt) => {
                    debt.update({
                        amount: debt.amount + transaction.amount,
                    });
                });
            }

            transaction.destroy().then(() => {
                res.send().status(204);
            });
        });
    });
};
