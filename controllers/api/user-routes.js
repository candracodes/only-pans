const router = require('express').Router();
const { User } = require('../../models');

// Create new user
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
        // Set up sessions with a 'loggedIn' variable set to `true`
        req.session.save(() => {
            req.session.loggedIn = true;
    
            res.status(200).json(dbUserData);
        });
    }   catch (err) {
        console.log(err);
        res.status(500).json(err);
        }
});
  
// Log in
router.post('login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        
        if (!dbUserData) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!'});
            return;
        }
        // check the password and make sure this password equals the one we sent in the body of the request, and if it passes these checks (match email and they have valid password, User extend Model we compare the login password bcrypt compareSync)
        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!'});
            return;
        }
        req.session.save(() => {
            // once the user successfully logs in, set up sessions with the 'loggedIn' variable
            req.session.loggedIn = true;
            res.status(200).json({ user: dbUserData, message: 'You are now logged in!'});
        });

    }   catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}) 

// Logout
router.post('/logout', (req, res) => {
    // when the user logs out, the session is destroyed
    if (req.session.loggedIn) {
        req.session.destroyed(() => {
        res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;