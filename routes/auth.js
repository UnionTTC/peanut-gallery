var debug = require('../lib/debug');
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user.js');
var router = module.exports = express.Router();

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use(passport.initialize());
router.use(passport.session());

router.use(function(req, res, next) {
    var user = req.user;
    //    DEBUG.log("This is " + user);
    if (user) {
        res.locals.user = {
            username: user.username
        };
    }
    next();
});

router.get('/login', function(req, res, next) {
    res.render('login', {
        title: 'Log In',
        user: req.user
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


router.post('/login', function(req, res, next) {
    debug.log(req.body.username + " logged in.");
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            debug.log(err);
        }
        if (!user) {
            return res.render('login', {
                title: "Log In",
                notification: {
                    severity: 'error',
                    message: "Your username or password is wrong. Try again."
                }
            });
        }
        // Log the user in and redirect to the homepage.
        req.login(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});
