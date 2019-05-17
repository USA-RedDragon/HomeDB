const Sequelize = require('sequelize');

module.exports.POSTApiLogin = (req, res) => {
    res.status(200).send();
};

module.exports.GETApiLogout = async (req, res) => {
    req.logout();
    res.status(200).send();
};

module.exports.POSTApiUsernameExists = async (req, res) => {
    const user = await req.db.users.findOne({
        where: {
            username: {
                [Sequelize.Op.eq]: req.body.username,
            },
        },
    });

    if (user) {
        return res.json({ exists: true });
    } else {
        return res.json({ exists: false });
    }
};
