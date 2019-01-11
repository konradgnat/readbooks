const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
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
  passport.authenticate('facebook', {
    successRedirect: '/books',
    failureRedirect: '/books'
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
    successRedirect: '/books',
    failureRedirect: '/books'
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
    successRedirect: '/books',
    failureRedirect: '/books'
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
