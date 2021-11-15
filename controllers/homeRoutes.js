const router = require('express').Router();
const { route } = require('.');
const { User } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// this code was written on Wednesday ( we want to display login page before homeage.)
router.get('/', async (req,res) => {
    res.render('login');
});

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async(req, res) => {
    try {
        const dbUserData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
        });

        const users = dbUserData.map((project) => project.get({ plain: true }));
        res.render('homepage', {
            users,
            logged_in: req.session.logged_in,
        });
    }   catch (err) {
        res.status(500).json(err);
    }

});


router.get('/login', (req, res) => {
    
    // If a session exists, redirect the request to te homepage
    if (req.session.logged_in) {

        res.redirect('/homepage'); 
        return;
    }
    res.render('login');
});


module.exports = router;