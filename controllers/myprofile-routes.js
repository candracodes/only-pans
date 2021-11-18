const router = require('express').Router();
const express = require('express');
const withAuth = require('../utils/auth');
const { Recipe, Category, User, Favorites } = require('../models');
const { config } = require('dotenv');
const sequelize = require('../config/connection');
const { QueryTypes } = require('sequelize');

router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {

            attributes: { exclude: ['password'] },
            include: [{ model: Recipe }],
        });
        const favorites = await sequelize.query(
            "SELECT * FROM favorite INNER JOIN recipe ON favorite.recipe_id=recipe.id WHERE favorite.user_id=?", {
                replacements: [req.session.user_id],
                type: QueryTypes.SELECT,
            }
      );
        const user = userData.get({ plain: true });

        res.render('myprofile', {
            ...user,
            favorites,
            logged_in: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// router.get('/', withAuth, async (req, res) => {
//     try {
//         const recipeData = await Recipe.findAll({
//             where: {
//                 user_id: req.session.user_id,
//             },

//             include: [{ model: User }],

//         });
//         const recipes = recipeData.map((recipes) =>
//             recipes.get({ plain: true })
//         );
//         console.log(recipes);
//         res.render('myprofile', {
//             recipes,
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

// THIS ROUTE WAS CREATED SOLELY TO POPULATE MODALS.....do I need this here as well???
router.get('/filter', withAuth, async (req, res) => {
    try {
        const dbRecipeData = await Recipe.findAll({
            include: [
                {
                    model: Category
                },
            ],
        });

        const recipes = dbRecipeData.map((recipes) =>
            recipes.get({ plain: true })
        );
        console.log(recipes);
        res.json(recipes)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
      const dbRecipeData = await sequelize.query(
            "SELECT * FROM favorite INNER JOIN recipe ON favorite.recipe_id=recipe.id WHERE favorite.user_id=?", {
                replacements: [req.session.user_id],
                type: QueryTypes.SELECT,
            }
      )
      
    //   const recipes = dbRecipeData.map((recipes) =>
    //   recipes.get({ plain: true })
    //   );
      console.log(dbRecipeData);
      res.json( dbRecipeData )
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });



module.exports = router