var LocalStrategy		= require('passport-local').Strategy,
	FacebookStrategy 	= require('passport-facebook').Strategy,
	TwitterStrategy 	= require('passport-twitter').Strategy,
	GoogleStrategy		= require('passport-google-oauth').OAuth2Strategy,
	User				= require('../models/user'),
	configAuth 			= require('../models/auth');

module.exports	= function(passport){
	
	// used to serialize the user for the session
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});


// ======================================
// LOCAL LOGIN
// ======================================

	passport.use('local-login', new LocalStrategy({
		// override default username with email
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true // allows pass back entire request to callback
	},
	function(req, email, password, done){ // callback with email and password from form
		// find user with same email as form
		User.findOne({'local.email' : email }, function(err, user) {
			if(err)
				return done(err);

			if(!user)
				return done(null, false, req.flash('loginMessage', 'No user found.'));
			if(!user.validPassword(password))
				return done(null, false, req.flash('loginMessage', 'Wrong password.'));
			console.log("login success");
			return done(null, user);
		});

	}));

// ======================================
// LOCAL SIGNUP
// ======================================

	passport.use('local-signup', new LocalStrategy({
		// override default local strategy username wiht email

		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, email, password, done) {
		// User.findOne wont fire unless data is sent back
		process.nextTick(function(){
			// find a user with same email as form
			// check if user already exists
			User.findOne({ 'local.email' : email }, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
				} if (req.user) {
					var user 		= req.user;
					user.local.email 	= email; 
					user.local.password = user.generateHash(password);
					user.save(function(err) {
						if (err) 
							throw err;
						return done(null, user);
					});

				} else {
					// if there is no user with that email, create new user
					var newUser	= new User();
					newUser.username =req.body.username;
					newUser.local.email	= email;
					newUser.local.password = newUser.generateHash(password);

					// save the user
					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));

// ======================================
// FACEBOOK
// ======================================

	passport.use(new FacebookStrategy({
		clientID		: configAuth.facebookAuth.clientID,
		clientSecret 	: configAuth.facebookAuth.clientSecret,
		callbackURL		: configAuth.facebookAuth.callbackURL,
		profileFields	: ["emails", "displayName", "name"],
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
	// facebook will send back the token and profile
	function(req, token, refreshToken, profile, done){
		// asynchronous
		process.nextTick(function(){
		console.log("fb profile = ");
		console.log( profile);
			if (!req.user) {
				console.log("req.user is not found");
				console.log(!req.user);
				User.findOne({'facebook.id': profile.id}, function(err, user){
					if(err)
						return done(err);
					if(user){
						// if there is a user id already but not token
						if (!user.facebook.token) {
							user.facebook.token = token;
							user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
							user.facebook.email = profile.emails[0].value;

							user.save(function(err) {
								if (err)
									throw err;
								return done(null, user);
							});
						}
						return done(null, user);
					} else {
						var newUser	= new User();
						console.log(profile);
						// set all fb information in our user model
						newUser.facebook.id 	= profile.id;
						newUser.facebook.token 	= token;
						newUser.name 	= profile.name.givenName + " " + profile.name.familyName;
						newUser.facebook.email 	= profile.emails[0].value;// ? (profile.emails[0].value): (profile.emails.value);
						// save user to db
						newUser.save(function(err){
							if(err)
								throw err;
							return done(null, newUser);
						});
					}
				});				
			} else {
				console.log("we have a user in fb strategy!! it is : " + req.user);
				// user already exists and is logged in, we link accounts
				var user = req.user // pull user out of the session
				// update the curent users fb credentials
				user.facebook.id 	= profile.id;
				user.facebook.token = token;
				user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
				user.facebook.email = profile.emails[0].value;

				// save the user
				user.save(function(err){
					if(err)
						throw err;
					return done(null, user);
				});
			}

		});
	}));

// ======================================
// TWITTER
// ======================================

	passport.use(new TwitterStrategy({
		consumerKey		: configAuth.twitterAuth.consumerKey,
		consumerSecret 	: configAuth.twitterAuth.consumerSecret,
		callbackURL		: configAuth.twitterAuth.callbackURL,
		passReqToCallback : true
	},
	// twitter will send back the token and profile
	function(req, token, tokenSecret, profile, done){
		// asynchronous
		console.log("profile = ");
		console.log( profile);
		process.nextTick(function(){
			if (!req.user) {
				console.log("req.user is not found");
				console.log(!req.user);
				User.findOne({'twitter.id': profile.id}, function(err, user){
					if(err)
						return done(err);
					if(user){
						// if there is a user id already but not token
						if (!user.twitter.token) {
							user.twitter.token = token;
							user.twitter.username = profile.username;
							user.twitter.displayName = profile.displayName;

							user.save(function(err) {
								if (err)
									throw err;
								return done(null, user);
							});
						}
						return done(null, user);
					} else {
						var newUser	= new User();
						// set all twitter information in our user model
						newUser.twitter.id 				= profile.id;
						newUser.twitter.token 			= token;
						newUser.twitter.username 		= profile.username;
						newUser.name 					= profile.displayName;
						// save user to db
						newUser.save(function(err){
							if(err)
								throw err;
							return done(null, newUser);
						});
					}
				});
			} else {
				// user already exists and is logged in, we link accounts
				var user = req.user // pull user out of the session
				// update the curent users fb credentials
				user.twitter.id 				= profile.id;
				user.twitter.token 			= token;
				user.twitter.username 		= profile.username;
				user.twitter.displayName 	= profile.displayName;
				// save the user
				user.save(function(err){
					if(err)
						throw err;
					return done(null, user);
				});
			}
		});
	}));


// ======================================
// GOOGLE
// ======================================
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true 

    },
	// google will send back the token and profile
    function(req, token, refreshToken, profile, done) {
		console.log("profile = ");
		console.log( profile);
		process.nextTick(function(){
			if (!req.user) {
				console.log("req.user is not found");
				console.log(!req.user);
				User.findOne({'google.id': profile.id}, function(err, user){
					if(err)
						return done(err);
					if(user){
						// if there is a user id already but no token
						if (!user.google.token) {
							user.google.token = token;
							user.google.name = profile.displayName;
							user.google.email = profile.emails[0].value;

							user.save(function(err) {
								if (err)
									throw err;
								return done(null, user);
							});
						}
						return done(null, user);
					} else {
						var newUser	= new User();
						// set all google information in our user model
						newUser.google.id 				= profile.id;
						newUser.google.token 			= token;
						newUser.name 					= profile.displayName;
						newUser.google.email 			= profile.emails[0].value;
						// save user to db
						newUser.save(function(err){
							if(err)
								throw err;
							return done(null, newUser);
						});
					}
				});
			} else {
				console.log("we have a logged in user connecting to google!! it is : " + req.user);
				// user already exists and is logged in, we link accounts
				var user = req.user // pull user out of the session
				// update the curent users fb credentials
				user.google.id 				= profile.id;
				user.google.token 			= token;
				user.google.name 			= profile.displayName;
				user.google.email 			= profile.emails[0].value;

				// save the user
				user.save(function(err){
					if(err)
						throw err;
					return done(null, user);
				});	
			}
		});
	}));
};

