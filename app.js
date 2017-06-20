var bodyParser 			= require('body-parser'),
	mongoose			= require('mongoose'),
	express				= require('express'),
	session 			= require('express-session'),
	methodOverride		= require('method-override'),
	app					= express(),
	Book 				= require('./models/book'),
	Comment				= require('./models/comment'),
	seedDB				= require('./seeds'),
	// cookieParser 		= require('cookie-parser'),
	passport			= require('passport'),
	LocalStrategy		= require('passport-local'),
	morgan 				= require('morgan'),
	flash 				= require('connect-flash');

// ROUTES
var indexRoutes 	= require('./routes/index'),
	bookRoutes		= require('./routes/books'),
	commentRoutes	= require('./routes/comments');

// CONNECT DATABASE
//var url = process.env.DATABASEURL || 'mongodb://localhost/booksread';
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost/booksread");

// mongoose.connect("mongodb://bookreader:lovesMuir@ds157971.mlab.com:57971/booksread");

//CONFIGURE AUTH
// app.use(require("express-session")({
// 	secret:"Om tare tu tare tore soha",
// 	resave: false,
// 	saveUninitialized:false
// }));

require('./config/passport')(passport); // pass passport for configuration

app.use(express.static(__dirname + '/public'));
// log every request to the console
app.use(morgan('dev'));
// app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.set("view engine", "ejs");
// app.use(require("express-session")({
// 	secret:"Om tare tu tare tore soha",
// 	resave: false,
// 	saveUninitialized:false
// }));
app.use(session({
  secret: 'omtaretutaretoresoha',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
// app.use(session({ secret: 'omtaretutaretoresoha' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

app.use(methodOverride("_method"));
seedDB();

app.use('/', indexRoutes);
app.use('/books',  bookRoutes);
app.use('/books/:id/comments', commentRoutes);

// app.listen(process.env.PORT, process.env.IP);
app.listen(8080, function(){
	console.log("server on 8080");
});
