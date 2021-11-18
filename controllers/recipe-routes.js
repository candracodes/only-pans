const router = require('express').Router();
const withAuth = require('../utils/auth');
const express = require('express');
const { Recipe, Category } = require('../models');

router.get('/', withAuth, async (req, res) => {
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
    res.render('recipes', {
        recipes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// THIS FILTERS THE PAGE BY RECIPE TYPE
router.get('/category/:type', async (req, res) => {
  try {
    const dbRecipeData = await Recipe.findAll( {
      where: {
        recipe_type: req.params.type
      }
    });
    const recipes = dbRecipeData.map((recipe) =>
    recipe.get({ plain: true })
    );
    res.render('recipes', {
      recipes,
      type: req.params.type
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// THIS ROUTE WAS CREATED SOLELY TO POPULATE MODALS
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
    res.json( recipes )
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const newRecipe = await Recipe.create({
      recipe_name: req.body.recipe_name,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
      recipe_type: req.body.recipe_type,
      // user_id: req.session.user_id,
    });

    const recipes = newRecipe.map((recipes) =>
    recipes.get({ plain: true})
    );

    res.status(200).json(recipes);
  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;
