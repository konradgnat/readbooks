var express = require('express'),
	router = express.Router({mergeParams:true});
	Comment 	= require('../models/comment'),
	Book 		= require('../models/book');


// ADD COMMENT
router.post('/', isLoggedIn, function(req, res){
	Book.findById(req.params.id, function(err, book){
		if(err){
			console.log(err);
		} else {
			Comment.create(req.body.comment, function(err, newComment){
				if(err){
					console.log(err);
				} else {
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
					book.comments.push(newComment);
					book.save();
					res.redirect('/books/' + book._id);
				}
			})
		}
	})
});

// EDIT ROUTES

router.get('/:comment_id/edit', function(req, res) {
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/edit', { comment: foundComment, book_id: req.params.id });
		}
	})
})
router.put('/:comment_id', function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/books/" + req.params.id);
		}
	})
})
router.delete('/:comment_id', function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/books/" + req.params.id);
		}
	});
});

// MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;