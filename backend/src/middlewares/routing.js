const expressJWT = require('express-jwt');

module.exports = {
    sendResponse,
    checkRequiredFields,
    auth,
    adminOnly
};

function sendResponse(status, req, res, next, objectToSend) {
    if (status === 204) {
        res.sendStatus(status);
        return next({ resSent: true });
    }

    if (status === 404) {
        objectToSend = {
            message: req.originalUrl + ' has not been found.'
        };
    }

    if (status > 499) {
        // Ideally send an email to an admin to assess and fix the problem
    }

    res.status(status).json(objectToSend);
    return next({ resSent: true });
}

function getBody(req) {
    if (req.method === 'GET') {
        return req.query;
    }

    return req.body;
}

function checkRequiredFields(fieldArray) {
    return (req, res, next) => {
        const body = getBody(req);

        for (let i = 0; i < fieldArray.length; i++) {
            if (body[fieldArray[i]] === undefined) {
                sendResponse(400, req, res, next, { message: fieldArray[i] + ' field missing in request.' });
                break;
            }
        }

        next();
    };
}

function auth(optional) {
    return expressJWT.expressjwt({
        secret: process.env.SECRET,
        credentialsRequired: optional,
        algorithms: ['HS256']
    });
}

function adminOnly(req, res, next) {
    if (req.auth?.role !== 'admin') {
        return sendResponse(403, req, res, next, { message: 'You need to be authenticated as an admin for this route.' });
    }
    next();
}
