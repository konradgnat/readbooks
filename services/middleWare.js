const Book = require('../models/book.js');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

const checkPostOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Book.findById(req.params.id, (err, foundBook) => {
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
