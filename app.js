var bodyParser 			= require('body-parser'),
	mongoose			= require('mongoose'),
	express				= require('express'),
	methodOverride		= require('method-override'),
	app					= express(),
	Book 				= require('./models/book'),
	Comment				= require('./models/comment'),
	seedDB				= require('./seeds');

var port = process.env.PORT || 8080;

// CONNECT DATABASE
mongoose.connect('mongodb://localhost/booksread');

// Book.create({
// 	title:"Eloquent Javascript",
// 	description: "This thoroughly revised edition reflects the current state of JavaScript and Web browsers, with new material, such as a chapter on code performance in JavaScript, and expanded coverage of recursion and closures. ..."
// });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + '/public'));
seedDB();

app.get('/', function(req, res){
	res.redirect('/books');
});
app.get('/books', function(req, res){
	Book.find({}, function(err, books){
		if(err){
			console.log(err);
		} else {
			res.render('index', {books: books});
		}
	})
});

// ADD NEW BOOK
app.get('/books/new', function(req, res){
	res.render('books/new');
})
app.post('/books', function(req, res){
	console.log(req.body)
	var title = req.body.title,
		description = req.body.description,
		newBook = { title: title, author: "author", dateRead: Date.now(),
		 description: description, note:"note" };
	Book.create(newBook, function(err){
		if(err){
			console.log(err);
		} else {
			res.redirect('/books');
		}
	})
})

// SHOW INDIVIDUAL BOOK
app.get('/books/:id', function(req, res){
	Book.findById(req.params.id).populate("comments").exec(function(err, book){
		if(err){
			console.log(err);
		} else {
			res.render('books/show', {book: book});
		}
	})
})

// EDIT BOOK
app.get('/books/:id/edit', function(req, res){
	Book.findById(req.params.id, function(err, foundBook){
		if(err){
			console.log(err);
		} else {
			res.render('books/edit', {book: foundBook});
		}
	})
})

// UPDATE BOOK
app.put('/books/:id', function(req, res){
	Book.findByIdAndUpdate(req.params.id, req.body.book, function(err, updatedBook){
		if(err){
			console.log(err);
		} else {
			res.redirect('/books/' + req.params.id);
		}
	})
})

// DESTROY BOOK
app.delete('/books/:id', function(req, res){
	Book.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
		} else {
			res.redirect('/books');
		}
	})
})

// ADD COMMENT
app.post('/books/:id/comments', function(req, res){
	Book.findById(req.params.id, function(err, book){
		if(err){
			console.log(err);
		} else {
			Comment.create(req.body.comment, function(err, newComment){
				if(err){
					console.log(err);
				} else {
					book.comments.push(newComment);
					book.save();
					res.redirect('/books/' + book._id);
				}
			})
		}
	})
})

app.listen(process.env.PORT || 8080, function() {
    console.log('App is running on http://localhost:' + port);
});