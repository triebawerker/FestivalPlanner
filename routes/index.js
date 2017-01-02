var express = require('express');
var passport = require('passport');
var router = express.Router();
var get_object_id = require('../helper');

var Account = require('../models/account');

router.get('/admin/*', function(req, res, next) {
console.log("user", req.user);
	if (req.user)
		next();
	else
		res.redirect('/login');

});

router.get('/', function(req, res, next) {
  res.render('index', {title: "Welcome"});
});

router.get('/register', function(req, res) {
		console.log("register form");
    res.render('account/register', {title: "Sign up"});
});

router.post('/register', function(req, res) {
		console.log("creating new account");
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('account/register', { error: err.message });
        }

        passport.authenticate('local')(req, res, function () {
        		if(err) {
        			return next(err);
        		}
        		console.log("authentication success after registration")
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('account/login', { title: "Sign in" });
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

router.get('/session', function(req, res, next) {
	res.status(200).send(req.session);

});

function isAuthenticated (req,res,next){
	console.log("is authenticated? ", req.user);
	console.log("request session ID: ", req.sessionID);
   if(req.user)
      return next();
   else
      res.redirect('/login');
}
module.exports = router;
