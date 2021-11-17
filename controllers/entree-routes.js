const router = require('express').Router();
const withAuth = require('../utils/auth');
const express = require('express');
const { Recipe, Category } = require('../models');

router.get('/', withAuth, async (req, res) => {
  try {
    const dbRecipeData = await Recipe.findAll({
      // should I include something here that says where {recipe_type: req.body.starters}
      where: {
        recipe_type: "entrees"
    },
      
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
    res.render('entrees', {
        recipes,
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



module.exports = router;
