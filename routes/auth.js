var express = require('express'),
	router	= express.Router(),
	flash 	= require('connect-flash');

module.exports = function(app, passport) {

	// route for fb authentication and login
	router.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

	// handle the callback after fb has authenticated user
	router.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successredirect : '/book',
			failureRedirect : '/book'
		}));
}