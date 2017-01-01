var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var get_object_id = require('../helper');

/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); */

router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
		console.log("register form");
    res.render('account/register', { });
});

router.post('/register', function(req, res) {
		console.log("creating new account");
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('account/register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
        		console.log("authentication success after registration")
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('account/login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
