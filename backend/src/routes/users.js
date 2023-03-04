const router = require('express').Router();

const usersController = require('../controllers/users');
const routing = require('../middlewares/routing');

router.post(
    '/login',
    routing.checkRequiredFields(['login', 'password']),
    (req, res, next) => {
        usersController.logIn(req.body.login, req.body.password)
            .then((user) => {
                routing.sendResponse(200, req, res, next, { user });
            })
            .catch(next);
    }
);

router.post(
    '/firstUser',
    routing.checkRequiredFields(['username', 'email', 'firstname', 'lastname', 'password']),
    (req, res, next) => {
        usersController.createFirstUser(
            req.body.username,
            req.body.email,
            req.body.firstname,
            req.body.lastname,
            req.body.password
        )
            .then((user) => {
                routing.sendResponse(201, req, res, next, { user });
            })
            .catch(next);
    }
);

router.get(
    '/',
    routing.auth(),
    routing.adminOnly,
    (req, res, next) => {
        console.log(req.auth);
        usersController.getAll()
            .then((users) => {
                routing.sendResponse(200, req, res, next, { users });
            })
            .catch(next);
    }
);

router.post(
    '/',
    routing.auth(),
    routing.adminOnly,
    routing.checkRequiredFields(['username', 'email', 'firstname', 'lastname', 'password']),
    (req, res, next) => {
        usersController.createUser(
            req.body.username,
            req.body.email,
            req.body.firstname,
            req.body.lastname,
            req.body.password,
            req.body.role
        )
            .then((user) => {
                routing.sendResponse(201, req, res, next, { user });
            })
            .catch(next);
    }
);

module.exports = router;
