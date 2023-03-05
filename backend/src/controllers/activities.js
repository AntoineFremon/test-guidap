const Activity = require('../models/Activity');

module.exports = {
    createActivity
};

function createActivity(name, description, photoUrl) {
    return Activity.create({ name, description, photoUrl });
}
