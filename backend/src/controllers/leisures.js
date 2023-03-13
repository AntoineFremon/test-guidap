const axios = require('axios');

const Leisure = require('../models/Leisure');
const Activity = require('../models/Activity');

module.exports = {
    createLeisure,
    getLeisures
};

function createLeisure(activitiesId, name, description, address, coordinates, webLink) {
    if (!coordinates) {
        return getCoordinates(address)
            .then((foundCoordinates) => {
                return createLeisure(activitiesId, name, description, address, foundCoordinates, webLink);
            });
    }

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

function getCoordinates(address) {
    return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.MAPBOX_TOKEN}`)
        .then((response) => {
            return Promise.resolve(response.data.features[0].geometry.coordinates[0] + ',' + response.data.features[0].geometry.coordinates[1]);
        });
}
