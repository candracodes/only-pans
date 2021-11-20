const User = require('./user');
const Category = require('./Category');
const Recipe = require('./recipe');
const Favorite = require('./favorites');

// Associations between recipe and category
Category.hasMany(Recipe, {
    foreignKey: 'category_id',
});

Recipe.belongsTo(Category, {
    foreignKey: 'category_id',
});

// Associations between user and recipe

User.hasMany(Recipe, {
    foreignKey: 'user_id',

});
Recipe.belongsTo(User, {
    foreignKey: 'user_id',

})



module.exports = { User, Category, Recipe, Favorite };


