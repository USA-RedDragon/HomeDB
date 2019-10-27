const argon2 = require('argon2');

module.exports.GETAPIUsersMe = (req, res) => {
    res.json(req.user);
};

module.exports.GETAPIUsers = (req, res) => {
    if (!req.user.admin) {
        return res.send().status(403);
    }
    req.db.users.findAll().then((models) => {
        res.json(models);
    });
};

module.exports.GETAPIUsersId = (req, res) => {
    // users can read their own user
    if (req.params.id !== 'current' && !req.user.admin) {
        return res.send().status(403);
    }

    const userId = (req.params.id === 'current' ? req.user.id : req.params.id);

    req.db.users.findByPk(userId, {
        attributes: { exclude: ['password'] },
    }).then((user) => {
        res.json(user);
    });
};

module.exports.PUTAPIUsersId = (req, res) => {
    // users can edit their own user
    if (req.params.id !== 'current' && !req.user.admin) {
        res.send().status(403);
    }

    const userId = (req.params.id === 'current' ? req.user.id : req.params.id);

    req.db.users.unscoped().findByPk(userId).then(async (user) => {
        if (req.body.password) {
            if (req.params.id === 'current') {
                // User must enter current password to change password
                const isValid = await argon2.verify(user.password, req.body.current_password);
                if (!isValid) {
                    delete req.body.password;
                    delete req.body.current_password;
                    return res.json({ message: 'Current password invalid.' }).status(422);
                }
            }
        } else {
            // don't change to blank password
            delete req.body.password;
            delete req.body.current_password;
        }

        if (req.params.id === 'current') {
            if (req.body.password && req.body.password !== '') {
                const isValid = await argon2.verify(user.password, req.body.current_password);
                if (!isValid) {
                    delete req.body.password;
                    delete req.body.current_password;
                    return res.json({ message: 'Current password invalid.' }).status(422);
                }
            }
        }
        user.update(req.body).then(() => {
            res.send().status(204);
        });
    });
};

module.exports.DELETEAPIUsersId = (req, res) => {
    if (!req.user.admin) {
        return res.send().status(403);
    }

    req.db.users.destroy({
        where: { id: req.params.id },
    }).then(() => {
        res.send().status(204);
    });
};

module.exports.POSTAPIUsers = (req, res) => {
    if (!req.user.admin) {
        return res.send().status(403);
    }

    if (req.body.password !== req.body.confirm_password) {
        return res.json({ message: 'Passwords don\'t match' }).status(422);
    }

    req.db.users.create(req.body).then((user) => {
        res.json(user);
    });
};
