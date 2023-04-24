const axios = require('axios');
const { Op } = require('sequelize');
const lodash = require('lodash');
const moment = require('moment');

const Leisure = require('../models/Leisure');
const Activity = require('../models/Activity');

const weatherController = require('./weather');

module.exports = {
    createLeisure,
    getLeisures,
    updateLeisure,
    deleteLeisure
};

function createLeisure(activitiesId, name, description, address, coordinates, webLink) {
    if (!coordinates) {
        return getCoordinates(address)
            .then((foundCoordinates) => {
                return createLeisure(activitiesId, name, description, address, foundCoordinates, webLink);
            });
    }

    const deburredName = lodash.deburr(name);
    const deburredDescription = lodash.deburr(description);

    return Leisure.create({
        name,
        deburredName,
        description,
        deburredDescription,
        address,
        coordinates,
        webLink
    })
        .then((createdLeisure) => {
            return createdLeisure.setActivities(activitiesId)
                .then(() => {
                    return Leisure.findByPk(createdLeisure.id, { include: [Activity] });
                });
        });
}

function getLeisures(activityId, search, pageSize = 20, offset = 0) {
    let include = 'Activities';
    if (activityId) {
        include = { model: Activity, where: { id: activityId } };
    }

    let where = {};
    if (search) {
        where = {
            [Op.or]: [
                { deburredName: { [Op.iRegexp]: lodash.deburr(search) } },
                { deburredDescription: { [Op.iRegexp]: lodash.deburr(search) } }
            ]
        };
    }
    return Leisure.findAll({
        where, limit: pageSize, offset, include, sort: ['id']
    })
        .then((leisures) => {
            const limit = moment().subtract(1, 'hours');
            leisures.forEach(async (l) => {
                if (!l.weatherDate || moment(l.weatherDate).isBefore(limit)) {
                    const weather = await weatherController.getCurrentWeather(l.coordinates.split(',')[0], l.coordinates.split(',')[1]);
                    l.weatherDescription = weather.description;
                    l.weatherIcon = weather.icon;
                    l.weatherDate = moment().toISOString();
                    await l.save()
                        .catch((e) => {
                            console.log('Error fetching weather for ' + l.coordinates);
                            console.log(e.data);
                        });
                }
            });

            return Promise.resolve(leisures);
        });
}

function getCoordinates(address) {
    return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.MAPBOX_TOKEN}`)
        .then((response) => {
            return Promise.resolve(response.data.features[0].geometry.coordinates[0] + ',' + response.data.features[0].geometry.coordinates[1]);
        });
}

function updateLeisure(leisureId, body) {
    return Leisure.findByPk(leisureId)
        .then((leisure) => {
            if (!leisure) {
                return Promise.reject({ status: 404, message: 'Leisure not found with id ' + leisureId });
            }

            const promises = [
                Leisure.update(body, { where: { id: leisureId } })
            ];

            if (body.activitiesId) {
                promises.push(leisure.setActivities(body.activitiesId));
            }

            return Promise.all(promises);
        })
        .then(() => {
            return Leisure.findByPk(leisureId, { include: [Activity] });
        });
}

function deleteLeisure(leisureId) {
    return Leisure.destroy({ where: { id: leisureId } });
}
