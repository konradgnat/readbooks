var express = require('express'),
    router	= express(),
    flash 	= require('connect-flash'),
    Profile = require('../models/user'),
    multer	= require('multer'),
    upload  = multer({ dest: 'uploads/' }),
    User 	= require('../models/user.js'),
    fs = require('fs'),
    mongoose = require('mongoose');

var upload = multer({ dest: 'uploads/' }).single('avatar');

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

router.put('/:id', isLoggedIn, function(req, res){

    upload(req, res, function(err) {
        if (err) {
            return res.send("Error uploading file.");
        }
        console.log('got the photo here!!!!', req.file);
        var newItem = new Item();
        newItem.img.data = fs.readFileSync(req.file.path)
        newItem.img.contentType = req.file.mimetype;
        newItem.save();
    });

    User.findByIdAndUpdate(req.params.id, req.body, function(err, updateUser) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/profile');
        }
    })
});

// MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;