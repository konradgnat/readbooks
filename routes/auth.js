const express = require('express');
const router = express.Router();
const passport = require('passport');

// route for fb authentication and login
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: 'email' }, 'cross', {
    session: true
  })
);

// handle the callback after fb has authenticated user
router.get(
  '/facebook/callback',
  // function(req, res){
  // res.render('login', {message: req.flash('loginMessage') });

  passport.authenticate('facebook', {
    successRedirect: '/posts',
    failureRedirect: '/posts'
  })
);

// TWITTER ROUTES
router.get(
  '/twitter',
  passport.authenticate('twitter', 'cross', { session: true })
);

router.get(
  '/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/posts',
    failureRedirect: '/posts'
  })
);

// GOOGLE ROUTES
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }, 'cross', {
    session: true
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/posts',
    failureRedirect: '/posts'
  })
);

/**
 * Gets current user if one exits
 * @type {router}
 */
router.get('/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;
