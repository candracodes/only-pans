// TODO: AT PRESENT, RECIPES STILL DOESN'T RENDER. JUST GETTING THE PATH STARTED SO WE CAN REVIEW AS A  GROUP
const router = require('express').Router();
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');

// router.post('/', async (req, res) => {
//     try {
//       const newRecipe = await Recipe.create({
//         ...req.body
//         // user_id: req.session.user_id,
//       });
  
//       res.status(200).json(newRecipe);
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   });

  router.get('/', withAuth, async(req, res) => {
    try {
        const dbUserData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['email', 'ASC']],
        });

        const users = dbUserData.map((project) => project.get({ plain: true }));
        res.render('recipes', {
            users,
            logged_in: req.session.logged_in,
        });
    }   catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;