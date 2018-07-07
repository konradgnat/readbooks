var bodyParser 			= require('body-parser'),
		mongoose			= require('mongoose'),
		express				= require('express'),
		session 			= require('express-session'),
		methodOverride		= require('method-override'),
		app					= express(),
		seedDB				= require('./seeds'),
		passport			= require('passport'),
		morgan 				= require('morgan'),
		multer				= require('multer'),
		flash 				= require('connect-flash');

// ROUTES
var indexRoutes 	= require('./routes/index'),
		bookRoutes		= require('./routes/books'),
		commentRoutes	= require('./routes/comments'),
		profileRoutes	= require('./routes/profile');

// Production or dev?
var production = false;

mongoose.Promise = global.Promise;
// CONNECT DATABASE
if (production) {
	mongoose.connect("mongodb://bookreader:lovesMuir@ds157971.mlab.com:57971/booksread", { useMongoClient: true })
	.then(() =>  console.log('mongodb connection succesful'))
	.catch((err) => console.error(err));
} else {
	mongoose.connect("mongodb://localhost/booksread", { useMongoClient: true })
	.then(() =>  console.log('local mongodb connection succesful'))
	.catch((err) => console.error(err));
}

require('./config/passport')(passport); // pass passport for configuration

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.set("view engine", "ejs");


app.use(session({
  secret: 'omtaretutaretoresoha',
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
app.use('/books/:id/comments', commentRoutes);


// app.listen(process.env.PORT, process.env.IP);
app.listen(process.env.PORT || 8080, function(){
	console.log("server on 8080");
});
