var mongoose = require('mongoose'),
	Book	= require('./models/book'),
	Comment	= require('./models/comment');

var data = [
	{
		title:"Eloquent Javascript",
		author: "Juju",
		dateRead: Date.now(),
		description: "This thoroughly revised edition reflects the current state of JavaScript and Web browsers, with new material, such as a chapter on code performance in JavaScript, and expanded coverage of recursion and closures. ...",
		note: "super good",
		postedBy: {
			id: "59344d3e65f3a72f9ab06fc9",
			email: "konrad9"
		}
	},
	{
		title:"Japanther",
		author: "Juju",
		dateRead: Date.now(),
		description: "This thoroughly revised edition reflects the current state of JavaScript and Web browsers, with new material, such as a chapter on code performance in JavaScript, and expanded coverage of recursion and closures. ...",
		note: "so so ",
		postedBy: {
			id: "59344d3e65f3a72f9ab06fc9",
			email: "konrad2"
		}
	},
	{
		title:"13th Floor Elevators",
		author: "Juju",
		dateRead: Date.now(),
		description: "This thoroughly revised edition reflects the current state of JavaScript and Web browsers, with new material, such as a chapter on code performance in JavaScript, and expanded coverage of recursion and closures. ...",
		note: "super good",
		postedBy: {
			id: "59344d3e65f3a72f9ab06fc9",
			email: "konrad"
		}
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