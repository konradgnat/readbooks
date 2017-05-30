var mongoose = require('mongoose'),
	Book	= require('./models/book'),
	Comment	= require('./models/comment');

var data = [
	{
		title:"Eloquent Javascript",
		description: "This thoroughly revised edition reflects the current state of JavaScript and Web browsers, with new material, such as a chapter on code performance in JavaScript, and expanded coverage of recursion and closures. ..."
	},
	{
		title:"ELMO",
		description: "This thoroughly revised edition reflects the current state of JavaScript and Web browsers, with new material, such as a chapter on code performance in JavaScript, and expanded coverage of recursion and closures. ..."
	},
	{
		title:"Good Dogs",
		description: "This thoroughly revised edition reflects the current state of JavaScript and Web browsers, with new material, such as a chapter on code performance in JavaScript, and expanded coverage of recursion and closures. ..."
	}
]

function seedDB(){
	Book.remove({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log("removed books");
			data.forEach(function(seed){
				Book.create(seed, function(err, book){
					if(err){
						console.log(err);
					} else {
						console.log("Book created");
						Comment.create({ 
								text: "This is a steller book!!",
								author: "Jane"
							}, function(err, comment){
							if(err){
								console.log(err);
							} else {
								book.comments.push(comment);
								book.save();
								console.log("created new comment");
							}
						})
					}
				})
			})
		}
	})
}

module.exports = seedDB;