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

module.exports.POSTApiAccountsLink = (req, res) => {
    req.plaid.exchangePublicToken(req.body.token).then((tokenResponse) => {
        req.plaid.getAuth(tokenResponse.access_token).then((authResponse) => {
            response = {};
            for (const account of authResponse.numbers.ach) {
                if (account.account.endsWith(req.body.mask)) {
                    response.accountNumber = account.account;
                    response.routingNumber = account.routing;
                    for (const accountInfo of authResponse.accounts) {
                        if (accountInfo.account_id === account.account_id) {
                            response.balance = accountInfo.balances.current;
                            break;
                        }
                    }
                    break;
                }
            }
            req.db.accounts.create({
                name: req.body.name,
                balance: response.balance,
                account_number: response.accountNumber,
                routing_number: response.routingNumber,
                plaid_access_token: tokenResponse.access_token,
                plaid_item_id: tokenResponse.item_id,
            }).then((account) => {
                const newAccount = Object.assign({}, account.get());
                delete newAccount.plaid_access_token;
                delete newAccount.plaid_item_id;
                res.json(newAccount);
            });
        }).catch((error) => {
            console.error(error);
            res.status(500).json({
                message: 'Unable to exchange Plaid token',
            });
        });
    }).catch((error) => {
        console.error(error);
        res.status(500).json({
            message: 'Unable to exchange Plaid token',
        });
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
