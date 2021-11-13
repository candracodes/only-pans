const sequelize = require('../config/connection');
const seedCategory = require('./categoryData');
const seedRecipes = require('./recipeData');

const seedAll = async () => {
    await sequelize.sync({ force: true});

    await seedCategory();

    await seedRecipes();

    process.exit(0);
};

seedAll();
