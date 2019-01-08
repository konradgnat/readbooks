var mongoose = require("mongoose"),
  bcrypt = require("bcrypt-nodejs");

var userSchema = mongoose.Schema({
  username: String,
  location: String,
  interests: String,
  topFiveAuthors: String,
  avatar: String,
  bookList: [
    {
      id: String,
      title: String
    }
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Follower"
    }
  ],
  local: {
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", userSchema);
