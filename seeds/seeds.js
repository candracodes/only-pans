const sequelize = require('../config/connection');
const { User, Recipe, Category } = require('../models');

const recipeData = require('./recipeData.json');
const userData = require('./userData.json');
const categoryData = require('./categoryData.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    const categories = await Category.bulkCreate(categoryData, {
        individualHooks: true,
        returning: true,
    });
    
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const recipe of recipeData) {
        let newRecipe = {
            ...recipe,
            user_id: users[Math.floor(Math.random() * users.length)].id,
            category_id: categories[Math.floor(Math.random() * categories.length)].id,
        }
        newRecipe.ingredients = JSON.stringify(newRecipe.ingredients),
        newRecipe.directions = JSON.stringify(newRecipe.directions),
    
        await Recipe.create(newRecipe);

    }

    

    process.exit(0);
};

seedDatabase();

