const Activity = require('../models/Activity');

module.exports = {
    createActivity,
    getAll
};

function createActivity(name, description, photoUrl) {
    return Activity.create({ name, description, photoUrl });
}

function getAll() {
    return Activity.findAll();
}
