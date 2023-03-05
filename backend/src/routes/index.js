const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/activities', require('./activities'));

module.exports = router;
