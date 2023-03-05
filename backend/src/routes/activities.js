const router = require('express').Router();

const activitiesController = require('../controllers/activities');
const routing = require('../middlewares/routing');

router.post(
    '/',
    routing.auth(),
    routing.checkRequiredFields(['name', 'description']),
    (req, res, next) => {
        activitiesController.createActivity(req.body.name, req.body.description, req.body.photoUrl)
            .then((activity) => {
                routing.sendResponse(201, req, res, next, { activity });
            })
            .catch(next);
    }
);

module.exports = router;
