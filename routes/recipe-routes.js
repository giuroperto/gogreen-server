const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Users = require('../models/Users')
const Recipes = require('../models/Recipes');


//GET Route to access all Recipes
router.get('/allrecipes', (req, res, next) => {

  Recipes.find()
  .populate('owner', 'reviews')
  .then(recipes => res.status(200).json(recipes))
  .catch(err => res.json(err));
})

//PUT Route to edit recipes
router.put('/recipe/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const { name, description, ingredients, dishTypes, vegan, cuisines, totalTimeMinutes, servings, instructions, picture } = req.body;

  Recipes.findByIdAndUpdate(id, { name, description, ingredients, dishTypes, vegan, cuisines, totalTimeMinutes, servings, instructions, picture })
  .then(recipe => res.json({ message: 'Recipe sucessfully updated' }))
  .catch(err => res.json(err));
})

//GET Route to access a specific recipe
router.get('/recipe/:id', (req, res, next) => {
  const { id } = req.params;

  Recipes.findById(id)
  .populate('owner', 'reviews')
  .then(recipe => res.status(200).json(recipe))
  .catch(err => res.json(err));
})

//POST Route to add a recipe
router.post('/add-a-new-recipe', (req, res, next) => {
  const { name, description, ingredients, dishTypes, vegan, cuisines, totalTimeMinutes, servings, instructions, picture } = req.body; 
  Recipes.create({ name, description, ingredients, dishTypes, vegan, cuisines, totalTimeMinutes, servings, instructions, picture })
  .then(newRecipe => {
    console.log(newRecipe)
    res.json({ message: `${newRecipe.name}  successfuly created!` })
  })
  .catch(err => res.json(err))
})

//DELETE Route to delete a recipe
router.delete('/recipe/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Recipes.findByIdAndRemove(id)
  .then(recipe => res.json({ message: 'Recipe successfully deleted'}))
  .catch(err => res.json(err));
})

module.exports = router;
