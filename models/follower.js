var mongoose = require('mongoose');

var followerSchema = mongoose.Schema({
  username: String,
  avatar: String,
  followerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model('Follower', followerSchema);
