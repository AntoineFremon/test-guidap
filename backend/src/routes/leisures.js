const router = require('express').Router();

const leisuresController = require('../controllers/leisures');
const routing = require('../middlewares/routing');

router.post(
    '/',
    routing.auth(),
    routing.checkRequiredFields(['name', 'description']),
    (req, res, next) => {
        leisuresController.createLeisure(
            req.body.activities,
            req.body.name,
            req.body.description,
            req.body.address,
            req.body.coordinates,
            req.body.webLink
        )
            .then((leisure) => {
                routing.sendResponse(201, req, res, next, { leisure });
            })
            .catch(next);
    }
);

router.get(
    '/',
    routing.auth(true),
    (req, res, next) => {
        leisuresController.getLeisures(req.query.pageSize, req.query.offset)
            .then((leisures) => {
                routing.sendResponse(200, req, res, next, { leisures });
            })
            .catch(next);
    }
);

module.exports = router;
