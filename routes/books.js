var express = require('express'),
	router	= express.Router(),
	Book 	= require('../models/book.js');


router.get('/', function(req, res){
	Book.find({}, function(err, books){
		if(err){
			console.log(err);
		} else {
			res.render('index', {books: books});
		}
	})
});

// ADD NEW BOOK
router.get('/new', isLoggedIn, function(req, res){
	res.render('books/new');
})
router.post('/', isLoggedIn, function(req, res){
	console.log(req);
	var title = req.body.title,
		description = req.body.description,
		author = req.body.author,
		publishedDate = req.body.publishedDate,
		thumbnail = req.body.thumbnail,
		thoughts = req.body.thoughts,
		postedBy = {
			id : req.user._id,
			username : req.user.username,
			email : (req.user.local.email) ? (req.user.local.email) : (req.user.facebook.name)
		},
		newBook = { thumbnail: thumbnail, title: title, author: author, publishedDate: publishedDate,
		 description: description, thoughts:thoughts, postedBy : postedBy };
	Book.create(newBook, function(err){
		if(err){
			console.log(err);
		} else {
			res.redirect('/books');
		}
	})
})

// SHOW INDIVIDUAL BOOK
router.get('/:id', function(req, res){
	Book.findById(req.params.id).populate("comments").exec(function(err, book){
		if(err){
			console.log(err);
		} else {
			res.render('books/show', {book: book});
		}
	})
})

// EDIT BOOK
router.get('/:id/edit', checkPostOwnership, function(req, res){
	Book.findById(req.params.id, function(err, foundBook){
		if(err){
			console.log(err);
		} else {
			res.render('books/edit', {book: foundBook});
		}
	})
})

// UPDATE BOOK
router.put('/:id', checkPostOwnership, function(req, res){
	Book.findByIdAndUpdate(req.params.id, req.body.book, function(err, updatedBook){
		if(err){
			console.log(err);
		} else {
			res.redirect('/books/' + req.params.id);
		}
	})
})

// DESTROY BOOK
router.delete('/:id', checkPostOwnership, function(req, res){
	Book.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
		} else {
			res.redirect('/books');
		}
	})
});

// MIDDLEWARE
function checkPostOwnership(req, res, next){
	console.log(req.user);
    if(req.isAuthenticated()){
        Book.findById(req.params.id, function(err, foundBook){
            if(err){
                res.redirect('back');
            } else {
                if(foundBook.postedBy.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        })
    } else {
        res.redirect("back");
    }
}

// MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;
