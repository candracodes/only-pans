const router = require('express').Router();
const homeRoutes = require('./homeRoutes.js');
const homepage = require('./homepage.js');
const userRoutes = require('./user-routes');
const recipeRoutes = require('./recipe-routes');

router.use('/', homeRoutes);
router.use('/homepage', homepage);
router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);

module.exports = router;
