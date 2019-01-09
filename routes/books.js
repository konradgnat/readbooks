const express = require('express');
const router = express.Router();
const Book = require('../models/book.js');
const checkPostOwnership = require('../services/middleware').checkPostOwnership;
const isLoggedIn = require('../services/middleWare').isLoggedIn;

/**
 * Gets all books
 */
router.get('/', function(req, res) {
  Book.find({}, function(err, books) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { books: books });
    }
  });
});

/**
 * Adds new book
 */
router.get('/new', isLoggedIn, function(req, res) {
  res.render('books/new');
});

/**
 * Creates new book and assigns book id to user
 */
router.post('/', isLoggedIn, function(req, res) {
  const email = req.user.local.email
    ? req.user.local.email
    : req.user.facebook.name;

  const newBook = {
    thumbnail: req.body.thumbnail,
    title: req.body.title,
    author: req.body.author,
    publishedDate: req.body.publishedDate,
    description: req.body.description,
    thoughts: req.body.thoughts,
    postedBy: {
      id: req.user._id,
      username: req.user.username,
      email,
      avatar: req.user.avatar
    }
  };

  Book.create(newBook, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/books');
    }
  });
});

/**
 * Shows individual book by :id
 */
router.get('/:id', function(req, res) {
  Book.findById(req.params.id)
    .populate('comments')
    .exec(function(err, book) {
      if (err) {
        console.log(err);
      } else {
        res.render('books/show', { book: book });
      }
    });
});

/**
 * Edits individual book by :id
 */
router.get('/:id/edit', checkPostOwnership, function(req, res) {
  Book.findById(req.params.id, function(err, foundBook) {
    if (err) {
      console.log(err);
    } else {
      res.render('books/edit', { book: foundBook });
    }
  });
});

/**
 * Shows individual book by :id
 */
router.put('/:id', checkPostOwnership, function(req, res) {
  Book.findByIdAndUpdate(req.params.id, req.body.book, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/books/' + req.params.id);
    }
  });
});

/**
 * Deletes individual book by :id
 */
router.delete('/:id', checkPostOwnership, function(req, res) {
  Book.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/books');
    }
  });
});

module.exports = router;
