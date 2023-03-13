const Leisure = require('../models/Leisure');
const Activity = require('../models/Activity');

module.exports = {
    createLeisure,
    getLeisures
};

function createLeisure(activitiesId, name, description, address, coordinates, webLink) {
    return Leisure.create({
        name,
        description,
        address,
        coordinates,
        webLink
    })
        .then((createdLeisure) => {
            return createdLeisure.setActivities(activitiesId.split(','))
                .then(() => {
                    return Leisure.findByPk(createdLeisure.id, { include: [Activity] });
                });
        });
}

function getLeisures(pageSize = 20, offset = 0) {
    return Leisure.findAll({ limit: pageSize, offset, include: 'Activities' });
}
