module.exports.GETApiPaychecks = (req, res) => {
    req.db.paychecks.findAll({
        limit: req.query.limit,
    }).then((paychecks) => {
        res.json(paychecks);
    });
};

module.exports.GETApiPaychecksId = (req, res) => {
    req.db.paychecks.findOne({
        where: { id: req.params.id },
    }).then((paycheck) => {
        res.json(paycheck);
    });
};

module.exports.POSTApiPaychecks = (req, res) => {
    req.db.paychecks.create({
        amount: req.body.amount,
        date: req.body.date,
        accountId: req.body.account,
    }).then((paycheck) => {
        req.db.accounts.findOne({
            where: { id: req.body.account },
        }).then((account) => {
            account.update({
                balance: Number(account.balance) + Number(req.body.amount),
            }).then(() => {
                res.json(paycheck);
            });
        });
    });
};

module.exports.PUTApiPaychecksId = (req, res) => {
    req.db.paychecks.findByPk(req.params.id).then((paycheck) => {
        req.db.accounts.findOne({
            where: { id: paycheck.accountId },
        }).then((account) => {
            account.update({ balance: Number(account.balance) - Number(paycheck.amount) }).then(() => {
                req.db.accounts.findOne({
                    where: { id: req.body.account },
                }).then((newAccount) => {
                    newAccount.update({
                        balance: Number(account.balance) + Number(paycheck.amount),
                    }).then(() => {
                        paycheck.update({
                            amount: req.body.amount,
                            date: req.body.date,
                            accountId: req.body.account,
                        }).then(() => {
                            res.send().status(204);
                        });
                    });
                });
            });
        });
    });
};

module.exports.DELETEApiPaychecksId = (req, res) => {
    req.db.paychecks.findOne({
        where: { id: req.params.id },
    }).then((paycheck) => {
        req.db.accounts.findOne({
            where: { id: paycheck.accountId },
        }).then((account) => {
            account.update({
                balance: account.balance - paycheck.amount,
            }).then(() => {
                paycheck.destroy().then(() => {
                    res.send().status(204);
                });
            });
        });
    });
};
