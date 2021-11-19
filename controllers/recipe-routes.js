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
  console.log(req.body)
  try {
    const newRecipe = await Recipe.create({
      ...req.body,
    });

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
})




module.exports = router;
