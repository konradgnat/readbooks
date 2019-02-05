var express = require('express'),
  router = express(),
  flash = require('connect-flash'),
  passport = require('passport'),
  Comment = require('../models/comment');

router.get('/', function(req, res) {
  res.redirect('/posts');
});

router.get('/register', function(req, res) {
  res.render('register', { message: req.flash('signupMessage') });
});

router.get('/login', function(req, res) {
  res.render('login', { message: req.flash('loginMessage') });
});

router.post(
  '/register',
  passport.authenticate('local-signup', {
    successRedirect: '/', // redirect to secure section
    failureRedirect: '/register', // redirect back to singup page
    failureFlash: true
  })
);

router.post(
  '/login',
  passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
