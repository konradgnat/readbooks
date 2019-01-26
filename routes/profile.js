const express = require('express');
const router = express();
const flash = require('connect-flash');
const multer = require('multer');
const User = require('../models/user.js');
const Follower = require('../models/follower.js');
const fs = require('fs');
const mongoose = require('mongoose');
const isLoggedIn = require('../services/middleWare').isLoggedIn;

/**
 * Gets current user appData object
 */
router.get('/', isLoggedIn, function(req, res) {
  res.render('app/main', { appData: res.locals.currentUser });
});

router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
      res.render('app/main', { user: user });
    }
  });
});

router.get('/api/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
      res.send({ user: user });
    }
  });
});

router.get('/:id/edit', isLoggedIn, function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      res.render('profile/edit', { user: user });
    }
  });
});

router.get('/:id/followers', function(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
      res.send({ error: true });
    } else {
      let query = User.find({ _id: { $in: user.followers }}).select({ username: 1, avatar: 1 });
      query.exec((err, followers) => {
        res.send(followers);
      });
    }
  });
});

router.put('/:id', isLoggedIn, uploadAvatar, function(req, res) {
  req.body.avatar = req.imageName;

  User.findByIdAndUpdate(req.params.id, req.body, function(err, updateUser) {
    if (err) {
      console.log(err);
    } else {
      res.redirect(`/profile/${req.params.id}`);
    }
  });
});

router.post('/:id/follow', isLoggedIn, function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      user.followers = user.followers.concat(req.user._id);
      user.save();
    }
  });
  User.findById(req.user._id, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      user.following = user.following.concat(req.params.id);
      user.save();
    }
  });

  res.send({ error: false })
});

// MIDDLEWARE
function uploadAvatar(req, res, next) {
  let imageName;
  let uploadStorage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      imageName = file.originalname;
      imageName = Date.now() + '_' + imageName;
      cb(null, imageName);
    }
  });

  let upload = multer({ storage: uploadStorage });

  let uploadFile = upload.single('avatar');

  uploadFile(req, res, function(err) {
    console.log('uploadFile');
    req.imageName = imageName;
    req.uploadError = err;
    next();
  });
}

module.exports = router;
