var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
	title: String,
	author: String,
	dateRead: Date,
	description: String,
	note: String,
	comments: [ 
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Book", bookSchema);