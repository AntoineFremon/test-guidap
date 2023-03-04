const crypto = require('crypto');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqlConnection');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        index: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
    },
    firstname: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
    hash: {
        type: DataTypes.STRING(4096),
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reset_password_token: {
        type: DataTypes.STRING
    },
    reset_password_expires: {
        type: DataTypes.DATE
    }
}, {
    indexes: [{ unique: true, fields: ['username', 'email'] }]
});

User.prototype.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

User.prototype.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

User.prototype.generateJWT = function () {
    const exp = moment().add(process.env.TOKEN_DAYS_EXP || 2, 'days');
    return jwt.sign({
        id: this.id,
        username: this.username,
        role: this.role,
        exp: exp.unix()
    }, process.env.SECRET);
};

User.prototype.toAuth = function () {
    // TODO refresh token
    return {
        id: this.id,
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        token: this.generateJWT(),
        tokenExpiration: moment().add(process.env.TOKEN_DAYS_EXP || 2, 'days'),
        role: this.role
    };
};

User.prototype.toJSON = function () {
    return {
        id: this.id,
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        role: this.role
    };
};

module.exports = User;
