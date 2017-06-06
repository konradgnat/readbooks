var LocalStrategy		= require('passport-local').Strategy,
	FacebookStrategy 	= require('passport-facebook').Strategy,
	TwitterStrategy 	= require('passport-twitter').Strategy,
	GoogleStrategy		= require('passport-google-oauth').OAuth2Strategy,
	User				= require('../models/user'),
	configAuth 			= require('./auth');

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
				} else {
					// if there is no user with that email, create new user
					var newUser	= new User();
					newUser.local.email	= email;
					newUser.local.password= newUser.generateHash(password);

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
// FACEBOOK
// ======================================

	passport.use(new FacebookStrategy({
		clientID		: configAuth.facebookAuth.clientID,
		clientSecret 	: configAuth.facebookAuth.clientSecret,
		callbackURL		: configAuth.facebookAuth.callbackURL,
		profileFields	: ["emails", "displayName", "name"]
	},
	// facebook will send back the token and profile
	function(token, refreshToken, profile, done){
		// asynchronous
		process.nextTick(function(){
			console.log(profile);
			User.findOne({'facebook.id': profile.id}, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, user);
				} else {
					var newUser	= new User();
					console.log(profile);
					// set all fb information in our user model
					newUser.facebook.id 	= profile.id;
					newUser.facebook.token 	= token;
					newUser.facebook.name 	= profile.name.givenName + " " + profile.name.familyName;
					newUser.facebook.email 	= profile.emails[0].value;// ? (profile.emails[0].value): (profile.emails.value);
					// save user to db
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
// TWITTER
// ======================================

	passport.use(new TwitterStrategy({
		consumerKey		: configAuth.twitterAuth.consumerKey,
		consumerSecret 	: configAuth.twitterAuth.consumerSecret,
		callbackURL		: configAuth.twitterAuth.callbackURL
	},
	// twitter will send back the token and profile
	function(token, tokenSecret, profile, done){
		// asynchronous
		process.nextTick(function(){
			User.findOne({'twitter.id': profile.id}, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, user);
				} else {
					var newUser	= new User();
					// set all twitter information in our user model
					newUser.twitter.id 				= profile.id;
					newUser.twitter.token 			= token;
					newUser.twitter.username 		= profile.username;
					newUser.twitter.displayName 	= profile.displayName;
					// save user to db
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
// GOOGLE
// ======================================

	passport.use(new GoogleStrategy({
		clientID		: configAuth.googleAuth.clientID,
		clientSecret 	: configAuth.googleAuth.clientSecret,
		callbackURL		: configAuth.googleAuth.callbackURL
	},
	// google will send back the token and profile
	function(accessToken, refreshToken, profile, done){
		console.log(profile);
		// asynchronous
		process.nextTick(function(){
			User.findOne({'google.id': profile.id}, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, user);
				} else {
					var newUser	= new User();
					// set all google information in our user model
					newUser.google.id 				= profile.id;
					newUser.google.token 			= accessToken;
					newUser.google.name 			= profile.displayName;
					newUser.google.email 			= profile.emails[0].value;
					// save user to db
					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));
};

