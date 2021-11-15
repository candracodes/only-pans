const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const homepage = require('./homepage.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/homepage', homepage);
module.exports = router;
