var express = require('express'),
    router	= express(),
    flash 	= require('connect-flash'),
    multer	= require('multer'),
    User 	= require('../models/user.js'),
    fs = require('fs'),
    mongoose = require('mongoose');


var Item = mongoose.Schema(
    { img:
        { data: Buffer, contentType: String }
    }
);
var Item = mongoose.model('Avatar', Item);

router.get('/', isLoggedIn, function(req, res){
    res.render('profile/show');
});

router.get('/:id', function(req, res){
	User.findById(req.params.id, function(err, user){
		if(err){
			console.log(err);
		} else {
			res.render('profile/showPublic', {user: user});
		}
    })
});

router.get('/:id/edit', isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            res.render('profile/edit', {user: user});
            // res.send(user);
        }
    })
});

router.put('/:id', isLoggedIn, uploadAvatar, function(req, res) {

    req.body.avatar = req.imageName;

    User.findByIdAndUpdate(req.params.id, req.body, function(err, updateUser) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/profile');
        }
    })
});

// MIDDLEWARE
function uploadAvatar(req, res, next) {
    var imageName;
    var uploadStorage = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
          imageName = file.originalname;
          imageName = Date.now() + '_' + imageName;
          cb(null, imageName);
      }
    });

    var upload = multer({storage: uploadStorage});

    var uploadFile = upload.single('avatar');

    uploadFile(req, res, function(err) {
        console.log('uploadFile');
        req.imageName = imageName;
        req.uploadError = err;
        next();
    })
}


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;