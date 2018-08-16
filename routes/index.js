var express = require('express'),
  router = express(),
  flash = require('connect-flash'),
  passport = require('passport'),
  Comment = require('../models/comment');

router.get('/', function (req, res) {
  res.redirect('/books');
});

router.get('/register', function (req, res) {
  res.render('register', {message: req.flash('signupMessage')});
});

router.get('/login', function (req, res) {
  res.render('login', {message: req.flash('loginMessage')});
});

router.post('/register', passport.authenticate('local-signup', {
  successRedirect: '/', // redirect to secure section
  failureRedirect: '/register', // redirect back to singup page
  failureFlash: true
}));

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// route for fb authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}, 'cross', {session: true}));

// handle the callback after fb has authenticated user
router.get('/auth/facebook/callback',
  // function(req, res){
  // res.render('login', {message: req.flash('loginMessage') });

  passport.authenticate('facebook', {
    successRedirect: '/books',
    failureRedirect: '/books'
  })
);

// TWITTER ROUTES
router.get('/auth/twitter', passport.authenticate('twitter', 'cross', {session: true}));

router.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/books',
    failureRedirect: '/books'
  }));

// GOOGLE ROUTES
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}, 'cross', {session: true}));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/books',
    failureRedirect: '/books'
  }));


// MIDDLEWARE
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}


module.exports = router;