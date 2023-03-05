const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqlConnection');

const Activity = sequelize.define('Activity', {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        index: true
    },
    description: {
        type: DataTypes.STRING
    },
    photoUrl: {
        type: DataTypes.STRING
    }
    // Any additional info on the activity
});

module.exports = Activity;
