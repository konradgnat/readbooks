const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const keys = require('../config/keys');

// TODO: Feature: Linking accounts -> need to have login route available, manage duplicate user info

module.exports = (passport) => {
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // ==================================================================================================================
  // LOCAL LOGIN
  // ==================================================================================================================

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        // override default username with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows pass back entire request to callback
      },
      (req, email, password, done) => {
        // callback with email and password from form
        // find user with same email as form
        User.findOne({ 'local.email': email }, function(err, user) {
          if (err) return done(err);

          if (!user)
            return done(
              null,
              false,
              req.flash('loginMessage', 'No user found.')
            );
          if (!user.validPassword(password))
            return done(
              null,
              false,
              req.flash('loginMessage', 'Wrong password.')
            );
          return done(null, user);
        });
      }
    )
  );

  // ==================================================================================================================
  // LOCAL SIGN UP
  // ==================================================================================================================

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        // override default local strategy username with email

        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
          // find a user with same email as form
          // check if user already exists
          User.findOne({ 'local.email': email }, function(err, user) {
            if (err) return done(err);
            if (user) {
              return done(
                null,
                false,
                req.flash('signupMessage', 'That email is already taken.')
              );
            }
            if (req.user) {
              const currentUser = req.user;
              currentUser.local.email = email;
              currentUser.local.password = currentUser.generateHash(password);
              currentUser.save(function(err) {
                if (err) throw err;
                return done(null, currentUser);
              });
            } else {
              // if there is no user with that email, create new user
              const newUser = new User();
              newUser.username = req.body.username;
              newUser.local.email = email;
              newUser.local.password = newUser.generateHash(password);

              // save the user
              newUser.save(function(err) {
                if (err) throw err;
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );

  // ==================================================================================================================
  // FACEBOOK
  // ==================================================================================================================

  passport.use(
    new FacebookStrategy(
      {
        clientID: keys.facebookClientID,
        clientSecret: keys.facebookClientSecret,
        callbackURL: keys.facebookCallbackURL,
        profileFields: ['emails', 'displayName', 'name'],
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      // facebook will send back the token and profile
      function(req, token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {
          if (!req.user) {
            User.findOne({ 'facebook.id': profile.id }, function(err, user) {
              if (err) return done(err);
              if (user) {
                // if there is a user id already but not token
                if (!user.facebook.token) {
                  user.facebook.token = token;
                  user.facebook.name =
                    profile.name.givenName + ' ' + profile.name.familyName;
                  user.facebook.email = profile.emails[0].value;

                  user.save(function(err) {
                    if (err) throw err;
                    return done(null, user);
                  });
                }
                return done(null, user);
              } else {
                var newUser = new User();
                // set all fb information in our user model
                newUser.facebook.id = profile.id;
                newUser.facebook.token = token;
                newUser.facebook.name =
                  profile.name.givenName + ' ' + profile.name.familyName;
                newUser.facebook.email = profile.emails[0].value;
                newUser.username =
                  profile.name.givenName + ' ' + profile.name.familyName;
                // save user to db
                newUser.save(function(err) {
                  if (err) throw err;
                  return done(null, newUser);
                });
              }
            });
          } else {
            // user already exists and is logged in, we link accounts
            var user = req.user; // pull user out of the session
            // update the curent users fb credentials
            user.facebook.id = profile.id;
            user.facebook.token = token;
            user.facebook.name =
              profile.name.givenName + ' ' + profile.name.familyName;
            user.facebook.email = profile.emails[0].value;

            // save the user
            user.save(function(err) {
              if (err) throw err;
              return done(null, user);
            });
          }
        });
      }
    )
  );

  // ==================================================================================================================
  // TWITTER
  // ==================================================================================================================

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: keys.twitterConsumerKey,
        consumerSecret: keys.twitterConsumerSecret,
        callbackURL: keys.twitterCallbackURL,
        passReqToCallback: true
      },
      // twitter will send back the token and profile
      function(req, token, tokenSecret, profile, done) {
        // asynchronous
        process.nextTick(function() {
          if (!req.user) {
            User.findOne({ 'twitter.id': profile.id }, function(err, user) {
              if (err) return done(err);
              if (user) {
                // if there is a user id already but not token
                if (!user.twitter.token) {
                  user.twitter.token = token;
                  user.twitter.username = profile.username;
                  user.twitter.displayName = profile.displayName;

                  user.save(function(err) {
                    if (err) throw err;
                    return done(null, user);
                  });
                }
                return done(null, user);
              } else {
                var newUser = new User();
                // set all twitter information in our user model
                newUser.username = profile.username;
                newUser.twitter.id = profile.id;
                newUser.twitter.token = token;
                newUser.twitter.username = profile.username;
                newUser.name = profile.displayName;
                // save user to db
                newUser.save(function(err) {
                  if (err) throw err;
                  return done(null, newUser);
                });
              }
            });
          } else {
            // user already exists and is logged in, we link accounts
            var user = req.user; // pull user out of the session
            // update the curent users fb credentials
            user.twitter.id = profile.id;
            user.twitter.token = token;
            user.twitter.username = profile.username;
            user.twitter.displayName = profile.displayName;
            // save the user
            user.save(function(err) {
              if (err) throw err;
              return done(null, user);
            });
          }
        });
      }
    )
  );

  // ==================================================================================================================
  // GOOGLE
  // ==================================================================================================================
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: keys.googleCallbackURL,
        passReqToCallback: true
      },
      // google will send back the token and profile
      function(req, token, refreshToken, profile, done) {
        process.nextTick(function() {
          if (!req.user) {
            User.findOne({ 'google.id': profile.id }, function(err, user) {
              if (err) {
                return done(err);
              }
              if (user) {
                // if there is a user id already but no token
                if (!user.google.token) {
                  // TODO: in what situation is user found but no token?
                  user.google.token = token;
                  user.google.name = profile.displayName;
                  user.google.email = profile.emails[0].value;

                  user.save(function(err) {
                    if (err) {
                      throw err;
                    }

                    return done(null, user);
                  });
                }

                return done(null, user);
              } else {
                var newUser = new User();
                // set all google information in our user model
                newUser.username = profile.displayName;
                newUser.google.id = profile.id;
                newUser.google.token = token;
                newUser.google.name = profile.displayName;
                newUser.google.email = profile.emails[0].value;
                // save user to db
                newUser.save(function(err) {
                  if (err) {
                    throw err;
                  }

                  return done(null, newUser);
                });
              }
            });
          } else {
            // user already exists and is logged in, we link accounts
            var user = req.user; // pull user out of the session
            // update the curent users fb credentials
            user.google.id = profile.id;
            user.google.token = token;
            user.google.name = profile.displayName;
            user.google.email = profile.emails[0].value;

            // save the user
            user.save(function(err) {
              if (err) {
                throw err;
              }

              return done(null, user);
            });
          }
        });
      }
    )
  );
};
