module.exports.GETApiGroceriesList = (req, res) => {
    req.db.grocery_list.findAll({
        include: [{
            model: req.db.groceries,
            required: true,
            as: 'grocery',
        }],
    }).then((groceries) => {
        res.json(groceries);
    });
};

module.exports.GETApiGroceriesDefault = (req, res) => {
    req.db.default_groceries.findAll({
        include: [{
            model: req.db.groceries,
            required: true,
            as: 'grocery',
        }],
    }).then((groceries) => {
        res.json(groceries);
    });
};

module.exports.POSTApiGroceriesGenerate = (req, res) => {
    req.db.default_groceries.findAll({}).then((defaultGroceries) => {
        req.db.grocery_list.destroy({
            where: {},
            truncate: true,
        }).then(async () => {
            for (let i = 0, len = defaultGroceries.length; i < len; i++) {
                await req.db.grocery_list.create({
                    groceryId: defaultGroceries[i].groceryId,
                    amount: defaultGroceries[i].amount,
                });
            }

            req.db.grocery_list.findAll({
                include: [{
                    model: req.db.groceries,
                    required: true,
                    as: 'grocery',
                }],
            }).then((groceryList) => {
                res.json(groceryList);
            });
        });
    });
};

module.exports.DELETEApiGroceriesList = (req, res) => {
    req.db.grocery_list.destroy({
        where: {},
        truncate: true,
    }).then(() => {
        res.send().status(204);
    });
};

module.exports.DELETEApiGroceriesDefault = (req, res) => {
    req.db.default_groceries.destroy({
        where: {},
        truncate: true,
    }).then(() => {
        res.send().status(204);
    });
};

module.exports.POSTApiGroceriesDefault = (req, res) => {
    req.db.default_groceries.create({
        groceryId: req.body.id,
        amount: req.body.amount,
    }).then(() => {
        req.db.default_groceries.findAll({
            include: [{
                model: req.db.groceries,
                required: true,
                as: 'grocery',
            }],
        }).then((defaultGroceries) => {
            res.json(defaultGroceries);
        });
    });
};

module.exports.POSTApiGroceriesList = (req, res) => {
    req.db.grocery_list.create({
        groceryId: req.body.id,
        amount: req.body.amount,
    }).then(() => {
        req.db.grocery_list.findAll({
            include: [{
                model: req.db.groceries,
                required: true,
                as: 'grocery',
            }],
        }).then((groceries) => {
            res.json(groceries);
        });
    });
};

module.exports.GETApiGroceries = (req, res) => {
    req.db.groceries.findAll().then((groceries) => {
        res.json(groceries);
    });
};

module.exports.POSTApiGroceries = (req, res) => {
    req.db.groceries.create({
        name: req.body.name,
    }).then((grocery) => {
        res.json(grocery);
    });
};
