var bodyParser 			= require('body-parser'),
	mongoose			= require('mongoose'),
	express				= require('express'),
	methodOverride		= require('method-override'),
	app					= express(),
	Book 				= require('./models/book'),
	Comment				= require('./models/comment'),
	seedDB				= require('./seeds'),
	// User				= require('./models/user'),
	passport			= require('passport'),
	LocalStrategy		= require('passport-local');

// ROUTES
var indexRoutes 	= require('./routes/index'),
	bookRoutes		= require('./routes/books'),
	commentRoutes	= require('./routes/comments');

//CONFIGURE AUTH
// app.use(require("express-session")({
// 	secret:"Om tare tu tare tore soha",
// 	resave: false,
// 	saveUninitialized:false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// CONNECT DATABASE
var url = process.env.DATABASEURL || 'mongodb://localhost/booksread';
mongoose.connect("mongodb://bookreader:lovesMuir@ds157971.mlab.com:57971/booksread");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + '/public'));
seedDB();

app.use('/', indexRoutes);
app.use('/books',  bookRoutes);
app.use('/books/:id/comments', commentRoutes);



// app.listen(process.env.PORT, process.env.IP);
app.listen(8080, function(){
	console.log("server on 8080");
});
