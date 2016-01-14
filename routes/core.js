var express = require('express');
var ensureLogin = require('connect-ensure-login');
var ensureAuthenticated = ensureLogin.ensureAuthenticated;

var router = module.exports = express.Router();

router.get('/', function(req, res, next) {
    res.redirect('/students');
});

router.all('*', ensureAuthenticated('/login'));
