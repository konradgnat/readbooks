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
      res.render('app/main', { user: user });
    }
  });
});

router.get('/api/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      console.log(err);
    } else {
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

/**
 * Gets all followers or following users for user
 */
router.get('/:id/followers', function(req, res) {
  getFollowList(req, res, false);
});

/**
 * Gets all users a user following
 */
router.get('/:id/following', function(req, res) {
  getFollowList(req, res, true);
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

/**
 * Follow a user route
 */
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
      user.following = user.following.concat(
        mongoose.Types.ObjectId(req.params.id)
      );
      user.save();
      res.send({ following: user.following });
    }
  });
});

/**
 * Unfollow a user route
 */
router.post('/:id/unfollow', isLoggedIn, function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      user.followers = user.followers.filter(
        f => f.toString() !== req.user._id.toString()
      );
      user.save();
    }
  });
  User.findById(req.user._id, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      user.following = user.following.filter(
        f => f.toString() !== req.params.id
      );
      user.save();
      res.send({ following: user.following });
    }
  });
});

// Helper functions
function getFollowList(req, res, following) {
  const methodName = following ? 'following' : 'followers';

  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      let query = User.find({
        _id: {
          $in: user[methodName]
        }
      }).select({
        username: 1,
        avatar: 1
      });
      query.exec((err, followList) => {
        if (err) {
          console.log(err);
        } else {
          res.send(followList);
        }
      });
    }
  });
}

// MIDDLEWARE
function uploadAvatar(req, res, next) {
  let imageName;
  const uploadStorage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      imageName = Date.now() + '_' + file.originalname;
      cb(null, imageName);
    }
  });

  const upload = multer({ storage: uploadStorage });

  const uploadFile = upload.single('avatar');

  uploadFile(req, res, function(err) {
    req.imageName = imageName;
    req.uploadError = err;
    next();
  });
}

module.exports = router;
