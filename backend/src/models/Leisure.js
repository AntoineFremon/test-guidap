const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqlConnection');

const Activity = require('./Activity');

const Leisure = sequelize.define('Leisure', {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        index: true
    },
    deburredName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        index: true
    },
    description: {
        type: DataTypes.STRING
    },
    deburredDescription: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    coordinates: {
        type: DataTypes.STRING,
        allowNull: false
    },
    webLink: {
        type: DataTypes.STRING
    }
});

Activity.belongsToMany(Leisure, { through: 'Leisure_Activity' });
Leisure.belongsToMany(Activity, { through: 'Leisure_Activity' });

module.exports = Leisure;
