var express = require('express'),
    router	= express(),
    flash 	= require('connect-flash'),
    Profile = require('../models/user'),
    multer	= require('multer'),
    // upload  = multer({ dest: 'uploads/' }),
    User 	= require('../models/user.js'),
    fs = require('fs'),
    mongoose = require('mongoose');

// var upload = multer({ dest: 'uploads/' }).single('avatar');

var Item = mongoose.Schema(
    { img:
        { data: Buffer, contentType: String }
    }
);
var Item = mongoose.model('Avatar', Item);

// router.post('/api/photo', function(req, res){
//     upload(req, res, function(err) {
//         if (err) {
//             return res.send("Error uploading file.");
//         }
//         console.log('got the photo here!!!!', req.file);
//         var newItem = new Item();
//         newItem.img.data = fs.readFileSync(req.file.path);
//         newItem.img.contentType = req.file.mimetype;
//         newItem.save();
//     });
// });

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

router.put('/:id', isLoggedIn, uploadAvatar,  function(req, res) {

    //, upload.single('avatar')
    //uploadAvatar,

    //
    // upload(req, res, function(err) {
    //     if (err) {
    //         return res.send("Error uploading file.");
    //     }
    //     console.log('got the photo here!!!!', req.file);
    //     var newItem = new Item();
    //     newItem.img.data = fs.readFileSync(req.file.path)
    //     newItem.img.contentType = req.file.mimetype;
    //     newItem.save();
    // });

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

function uploadAvatar(req, res, next) {
    console.log('inside upa');
    var imageName;
    var uploadStorage = multer.diskStorage({
      destination: function (req, file, cb) {
          console.log('inside dest');
          cb(null, './uploads');
      },
      filename: function (req, file, cb) {
        console.log('inside filename');

          imageName = file.originalname;
          // imageName += Date.now();
          cb(null, imageName);
      }
    });

    var uploader = multer({storage: uploadStorage});

    var uploadFile = upload.single('avatar');

    uploadFile(req, res, function(err) {
        console.log('uploadFile');
        req.imageName = imageName;
        req.uploadError = err;
        next();
    })
}

function middleware(req, res, next) {
  var imageName;
  var uploadStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      imageName = file.originalname;
      imageName += Date.now();
      cb(null, imageName);
    }
  });

  var uploader = multer({storage: uploadStorage});

  var uploadFile = upload.single('avatar');

  uploadFile(req, res, function (err) {
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