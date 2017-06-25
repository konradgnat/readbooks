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
					console.log("req.user = ");
					console.log(req.user);
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.name;
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

router.get('/comments/:id/edit', function(req, res) {
	Comment.findById(req.params.id, function(err, comment) {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/edit', { comment: comment });
		}
	})
})
router.put('/comments/:id', function(req, res) {
	Comment.findByIdAndUpdate(req.params.id, req.body.comment, function(err, updatedComment) {
		if (err) {
			console.log(err);
		} else {
			res.render()
		}
	})
})

// MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;