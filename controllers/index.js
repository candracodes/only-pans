const router = require('express').Router();
const homeRoutes = require('./homeRoutes.js');
const homepage = require('./homepage.js');
const userRoutes = require('./user-routes');
const recipeRoutes = require('./recipe-routes');
const starterRoutes = require('./starter-routes');
const sidesRoutes = require('./side-routes');
const dessertRoutes = require('./dessert-routes');
const entreeRoutes = require('./entree-routes');
const myProfileRoutes = require('./myprofile-routes');
const favoriteRoutes = require('./favorite-routes');

router.use('/', homeRoutes);
router.use('/homepage', homepage);
router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/starters', starterRoutes);
router.use('/sides', sidesRoutes);
router.use('/desserts', dessertRoutes);
router.use('/entrees', entreeRoutes);
router.use('/myprofile', myProfileRoutes);
router.use('/favorite', favoriteRoutes);

module.exports = router;
