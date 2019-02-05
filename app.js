const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();
const seedDB = require('./services/seeds');
const passport = require('passport');
const morgan = require('morgan');
const multer = require('multer');
const flash = require('connect-flash');
const keys = require('./config/keys');

// ROUTES
const indexRoutes = require('./routes/index');
const bookRoutes = require('./routes/books');
const commentRoutes = require('./routes/comments');
const profileRoutes = require('./routes/profile');
const authRoutes = require('./routes/auth');
const exploreRoutes = require('./routes/explore');

// CONNECT DATABASE
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'production') {
  mongoose
    .connect(
      'mongodb://localhost/bihkal',
      { useMongoClient: true }
    )
    .then(() => console.log('local mongodb connection successful'))
    .catch(err => console.error(err));
} else {
  mongoose
    .connect(
      keys.mongoURI,
      { useMongoClient: true }
    )
    .then(() => console.log('mongodb connection successful'))
    .catch(err => console.error(err));
}

require('./services/passport')(passport); // pass passport for configuration

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(
  session({
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(methodOverride('_method'));

// Seeds database with dummy data for development purposes
// seedDB();

app.use('/', indexRoutes);
app.use('/posts', bookRoutes);
app.use('/profile', profileRoutes);
app.use('/auth', authRoutes);
app.use('/explore', exploreRoutes);
app.use('/posts/:id/comments', commentRoutes);

const PORT = process.env.PORT || 8083;
app.listen(PORT, function() {
  console.log(`server on ${PORT}`);
});
