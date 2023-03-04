const { Op } = require('sequelize');

const User = require('../models/User');

module.exports = {
    logIn,
    createFirstUser,
    getAll,
    createUser
};

function logIn(login, password) {
    return User.findOne({
        where: {
            [Op.or]: [
                { email: login },
                { username: login }
            ]
        }
    })
        .then((foundUser) => {
            if (!foundUser || !foundUser.validPassword(password)) {
                return Promise.reject({ status: 422 });
            }

            return Promise.resolve(foundUser.toAuth());
        });
}

function createFirstUser(username, email, firstname, lastname, password) {
    return User.findOne()
        .then((alreadyThere) => {
            if (alreadyThere) {
                return Promise.reject({ status: 403, message: 'There is already a user in the database.' });
            }

            return createUser(username, email, firstname, lastname, password, 'admin');
        });
}

function getAll() {
    return User.findAll();
}

function createUser(username, email, firstname, lastname, password, role) {
    const user = User.build({
        username,
        email,
        firstname,
        lastname,
        role
    });

    user.setPassword(password);

    return user.save();
}
