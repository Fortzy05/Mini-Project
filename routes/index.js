var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/Users');


router.get('/', (req, res) => {
    res.render('landing');
});



//=====================
// AUTH ROUTES
//=====================

//SHOW REGISTER FORM
router.get('/register', (req, res) => {
    res.render('register');
});

// handle sign up logic

router.post('/register', (req, res) => {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('register')
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/campgrounds');
        });
    });
});

// show login form
router.get('/login', (req, res) => {
    res.render('login');
});
//handling login logic
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function (req, res) {
});

//logout route

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/campgrounds');
});
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
module.exports = router;