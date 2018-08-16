let express = require('express'),
    router = express(),
    flash = require('connect-flash'),
    multer = require('multer'),
    User = require('../models/user.js'),
    Follower = require('../models/follower.js'),
    fs = require('fs'),
    mongoose = require('mongoose');

// router.get('/', isLoggedIn, function (req, res) {
router.get('/', function (req, res) {
  res.render('app/main', { appData: res.locals.currentUser });
});

router.get('/:id', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
      res.render('profile/showPublic', {user: user});
    }
  })
});

router.get('/:id/edit', isLoggedIn, function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.render('profile/edit', {user: user});
    }
  })
});

router.put('/:id', isLoggedIn, uploadAvatar, function (req, res) {

  req.body.avatar = req.imageName;

  User.findByIdAndUpdate(req.params.id, req.body, function (err, updateUser) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/profile');
    }
  })
});

router.post('/:id/follow', isLoggedIn, function(req, res) {

  User.findById(req.params.id, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      let follower = { username: req.user.username, followerId: req.user._id, avatar: req.user.avatar };
      Follower.create(follower, function(err, newFoll) {
        if (err) {
          console.log(err);
        } else {
          newFoll.avatar = 'avatarplaceholder';
          newFoll.save();
          user.followers = user.followers.concat(newFoll);
          user.save();
          res.redirect('/profile/' + req.params.id);
        }
      });
    }
  });
});

// MIDDLEWARE
function uploadAvatar(req, res, next) {
  let imageName;
  let uploadStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      imageName = file.originalname;
      imageName = Date.now() + '_' + imageName;
      cb(null, imageName);
    }
  });

  let upload = multer({storage: uploadStorage});

  let uploadFile = upload.single('avatar');

  uploadFile(req, res, function (err) {
    console.log('uploadFile');
    req.imageName = imageName;
    req.uploadError = err;
    next();
  })
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;