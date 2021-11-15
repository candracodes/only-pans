// GET ROUTES that render homepage.handlebars
const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User } = require('../models');

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

module.exports = router;