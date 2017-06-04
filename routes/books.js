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
router.get('/new', function(req, res){
	res.render('books/new');
})
router.post('/', function(req, res){
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
router.get('/:id/edit', function(req, res){
	Book.findById(req.params.id, function(err, foundBook){
		if(err){
			console.log(err);
		} else {
			res.render('books/edit', {book: foundBook});
		}
	})
})

// UPDATE BOOK
router.put('/:id', function(req, res){
	Book.findByIdAndUpdate(req.params.id, req.body.book, function(err, updatedBook){
		if(err){
			console.log(err);
		} else {
			res.redirect('/books/' + req.params.id);
		}
	})
})

// DESTROY BOOK
router.delete('/:id', function(req, res){
	Book.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
		} else {
			res.redirect('/books');
		}
	})
})

module.exports = router;
