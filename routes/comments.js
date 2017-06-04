var express = require('express'),
	router = express.Router({mergeParams:true});
	Comment 	= require('../models/comment'),
	Book 		= require('../models/book');


// ADD COMMENT
router.post('/', function(req, res){
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

module.exports = router;