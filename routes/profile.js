var express = require('express'),
    router	= express(),
    flash 	= require('connect-flash'),
    Profile = require('../models/user'),
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

router.put('/:id', isLoggedIn,  function(req, res) {

    var storage = multer.diskStorage({
      destination: __dirname+'/uploads'
    });
    var upload = multer({ storage: storage }).any()

    upload(req, res, function(err) {
      if (err) {
        console.log(err);
        return res.end('error uploading file');
      } else {
        console.log('inside upload', req.files);

      }
    });

    // req.body.fileName = req.fileName;
    console.log('inside put, req: ', req.file, req.body);

    User.findByIdAndUpdate(req.params.id, req.body, function(err, updateUser) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/profile');
        }
    })
});

// MIDDLEWARE

// function uploadAvatar(req, res, next) {
//     console.log('inside upa');
//     var imageName;
//     var uploadStorage = multer.diskStorage({
//       destination: function (req, file, cb) {
//           console.log('inside dest');
//           cb(null, './uploads');
//       },
//       filename: function (req, file, cb) {
//         console.log('inside filename');
//
//           imageName = file.originalname;
//           // imageName += Date.now();
//           cb(null, imageName);
//       }
//     });
//
//     var uploader = multer({storage: uploadStorage});
//
//     var uploadFile = upload.single('avatar');
//
//     uploadFile(req, res, function(err) {
//         console.log('uploadFile');
//         req.imageName = imageName;
//         req.uploadError = err;
//         next();
//     })
// }
//
// function middleware(req, res, next) {
//   var imageName;
//   var uploadStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads');
//     },
//     filename: function (req, file, cb) {
//       imageName = file.originalname;
//       imageName += Date.now();
//       cb(null, imageName);
//     }
//   });
//
//   var uploader = multer({storage: uploadStorage});
//
//   var uploadFile = upload.single('avatar');
//
//   uploadFile(req, res, function (err) {
//     req.imageName = imageName;
//     req.uploadError = err;
//     next();
//   })
// }

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;