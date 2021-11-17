const apiRoutes = require('./api');
const router = require('express').Router();
const homeRoutes = require('./homeRoutes.js');
const homepage = require('./homepage.js');
//const userRoutes = require('./user-routes');
const recipeRoutes = require('./recipe-routes');
const starterRoutes = require('./starter-routes');
const sidesRoutes = require('./side-routes');
const dessertRoutes = require('./dessert-routes');
const entreeRoutes = require('./entree-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/homepage', homepage);
//router.use('/users', userRoutes);
//router.use('/recipes', recipeRoutes);
router.use('/starters', starterRoutes);
router.use('/sides', sidesRoutes);
router.use('/desserts', dessertRoutes);
router.use('/entrees', entreeRoutes);

module.exports = router;
