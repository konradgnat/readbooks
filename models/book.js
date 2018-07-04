var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
  title: String,
  thumbnail: String,
  author: String,
  publishedDate: String,
  description: String,
  thoughts: String,
  postedBy: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    email: String,
    avatar: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Book", bookSchema);