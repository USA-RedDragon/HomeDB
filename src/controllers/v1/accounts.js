module.exports.GETAPIAccounts = (req, res) => {
    req.db.accounts.findAll().then((accounts) => {
        res.json(accounts);
    });
};

module.exports.POSTApiAccounts = (req, res) => {
    req.db.accounts.create({
        name: req.body.name,
        balance: req.body.balance,
        account_number: req.body.account_number,
        routing_number: req.body.routing_number,
    }).then((account) => {
        res.json(account);
    });
};

module.exports.GETAPIAccountsId = (req, res) => {
    req.db.accounts.findOne({
        where: { id: req.params.id },
    }).then((account) => {
        res.json(account);
    });
};

module.exports.PUTAPIAccountsId = (req, res) => {
    req.db.accounts.findOne({
        where: { id: req.params.id },
    }).then((account) => {
        account.update(req.body);
        res.send().status(204);
    });
};

module.exports.DELETEAPIAccountsId = (req, res) => {
    req.db.accounts.destroy({
        where: { id: req.params.id },
    }).then(() => {
        res.send().status(204);
    });
};
