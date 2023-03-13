const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/activities', require('./activities'));
router.use('/leisures', require('./leisures'));

module.exports = router;
