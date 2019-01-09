const Book = require('../models/book.js');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkPostOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Book.findById(req.params.id, function(err, foundBook) {
      if (err) {
        res.redirect('back');
      } else {
        if (foundBook.postedBy.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    res.redirect('back');
  }
}

module.exports = { checkPostOwnership, isLoggedIn };
