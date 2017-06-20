var express = require('express'),
	router	= express(),
	flash 	= require('connect-flash'),
	passport = require('passport');

router.get('/', function(req, res){
	res.redirect('/books');
});

router.get('/register', function(req, res){
	res.render('register', {message: req.flash('signupMessage')});
});

router.get('/profile', function(req, res){
	res.render('profile');
})

router.get('/login', function(req, res){
	res.render('login', {message: req.flash('loginMessage') });
})

router.post('/register', passport.authenticate('local-signup', {
	successRedirect	: '/', // redirect to secure section
	failureRedirect	: '/register', // redirect back to singup page
	failureFlash : true
}));

router.post('/login', passport.authenticate('local-login', {
	successRedirect : '/',
	failureRedirect : '/login',
	failureFlash : true
}));

router.get('/logout', function(req, res){
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
		successRedirect : '/books',
		failureRedirect : '/books'
	})
);

// TWITTER ROUTES
router.get('/auth/twitter', passport.authenticate('twitter','cross', {session: true}));

router.get('/auth/twitter/callback',
	passport.authenticate('twitter', {
		successRedirect : '/books',
		failureRedirect : '/books'
}));

// GOOGLE ROUTES
router.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}, 'cross', {session: true}));

router.get('/auth/google/callback',
	passport.authenticate('google', {
		successRedirect : '/books',
		failureRedirect : '/books'
}));

// =============================================================================
// AUTHORIZE / ALREADY LOGGED IN ===============================================
// =============================================================================

// locally -----------------------
router.get('/connect/local', function(req, res) {
	res.render('connect-local.ejs', {message: req.flash('loginMessage') });
});
router.post('/connect/local', passport.authenticate('local-signup', {
	successRedirect : '/profile',
	failureRedirect : '/profile', 
	failureFlash : true
}));

// facebook -------------------------
router.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

router.get('/connect/facebook/callback',
	passport.authorize('facebook', {
		successRedirect : '/profile',
		failureRedirect : '/profile'
	}));

// twitter ----------------------------
router.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

router.get('/connect/twitter/callback',
	passport.authorize('twitter', {
		successRedirect : '/profile',
		failureRedirect : '/profile'
	}));
// google  ----------------------------
router.get('/connect/google', passport.authorize('google', {scope : ['profile', 'email']}));

router.get('/connect/google/callback',
	passport.authorize('google', {
		successRedirect : '/profile',
		failureRedirect : '/profile'
	}));


// Unlinking Accounts

// local  ----------------------------
router.get('/unlink/local', function(req, res) {
	var user 			= req.user;
	user.local.email	= undefined;
	user.local.password	= undefined;
	user.save(function(err) {
		res.redirect('/profile');
	});
});

// facebook  ----------------------------
router.get('/unlink/facebook', function(req, res) {
	var user			= req.user;
	user.facebook.token	= undefined;
	user.save(function(err) {
		res.redirect('/profile');
	});
});

// twitter  ----------------------------
router.get('/unlink/twitter', function(req, res) {
	var user			= req.user;
	user.twitter.token	= undefined;
	user.save(function(err) {
		res.redirect('/profile');
	});
});

// google  ----------------------------
router.get('/unlink/google', function(req, res) {
	var user			= req.user;
	user.google.token	= undefined;
	user.save(function(err) {
		res.redirect('/profile');
	});
});


// MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;