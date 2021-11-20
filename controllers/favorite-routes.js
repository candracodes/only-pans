const router = require('express').Router();
const withAuth = require('../utils/auth');
const express = require('express');
const { Recipe, Favorite } = require('../models');




router.post('/', withAuth, async (req, res) => {
    console.log(req.body)
    try {
      const newFavorite = await Favorite.create({
        ...req.body,
      });
  
      res.status(200).json(newFavorite);
    } catch (err) {
      res.status(400).json(err);
    }
  })
  

module.exports = router;