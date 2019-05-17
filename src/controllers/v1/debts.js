module.exports.GETApiDebts = (req, res) => {
    req.db.debts.findAll({
        limit: req.query.limit,
    }).then((debts) => {
        res.json(debts);
    });
};

module.exports.GETApiDebtsId = (req, res) => {
    req.db.debts.findOne({
        where: { id: req.params.id },
    }).then((debt) => {
        res.json(debt);
    });
};

module.exports.POSTApiDebts = (req, res) => {
    req.db.debts.create({
        amount: req.body.amount,
        name: req.body.name,
    }).then((debt) => {
        res.json(debt);
    });
};

module.exports.PUTApiDebtsId = (req, res) => {
    req.db.debts.findOne({
        where: { id: req.params.id },
    }).then((debt) => {
        debt.update(req.body);
        res.send().status(204);
    });
};

module.exports.DELETEApiDebtsId = (req, res) => {
    req.db.debts.destroy({
        where: { id: req.params.id },
    }).then(() => {
        res.send().status(204);
    });
};
