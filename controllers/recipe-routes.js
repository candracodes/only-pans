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
    res.render('recipes', {
        recipes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
