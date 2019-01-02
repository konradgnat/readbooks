const bodyParser 				= require('body-parser'),
		mongoose					= require('mongoose'),
		express						= require('express'),
		session 					= require('express-session'),
		methodOverride		= require('method-override'),
		app					  		= express(),
		seedDB						= require('./seeds'),
		passport					= require('passport'),
		morgan 						= require('morgan'),
		multer						= require('multer'),
		flash 						= require('connect-flash'),
		keys							= require('./config/keys');

// ROUTES
const indexRoutes 	= require('./routes/index'),
		bookRoutes		= require('./routes/books'),
		commentRoutes	= require('./routes/comments'),
  	profileRoutes	= require('./routes/profile');
		exploreRoutes	= require('./routes/explore');

// Production or dev?
let production = true;

mongoose.Promise = global.Promise;
// CONNECT DATABASE
if (production) {
	mongoose.connect(keys.mongoURI, { useMongoClient: true })
	.then(() =>  console.log('mongodb connection succesful'))
	.catch((err) => console.error(err));
} else {
	mongoose.connect("mongodb://localhost/booksread", { useMongoClient: true })
	.then(() =>  console.log('local mongodb connection succesful'))
	.catch((err) => console.error(err));
}

require('./services/passport')(passport); // pass passport for configuration

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.set("view engine", "ejs");


app.use(session({
  secret: keys.cookieKey,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(methodOverride("_method"));
seedDB();

app.use('/', indexRoutes);
app.use('/books',  bookRoutes);
app.use('/profile',  profileRoutes);
app.use('/explore',  exploreRoutes);
app.use('/books/:id/comments', commentRoutes);

const PORT = process.env.PORT || 8083;
// app.listen(process.env.PORT, process.env.IP);
app.listen(PORT, function(){
	console.log(`server on ${PORT})`);
});
