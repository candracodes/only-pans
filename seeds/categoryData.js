const { Category } = require('../models');

const categoryData = [
    {
        name: 'Starters',
    },
    {
        name: 'Entrees',
    },
    {
        name: 'Side Dishes',
    },
    {
        name: 'Desserts',
    },
];

const seedCategory = () => Category.bulkCreate(categoryData);

module.exports = seedCategory;
