var express = require('express'),
	router	= express(),
	flash 	= require('connect-flash'),
	Profile = require('../models/user'),
	multer	= require('multer'),
    upload  = multer({ dest: 'uploads/' }),
	User 	= require('../models/user.js');

router.get('/', isLoggedIn, function(req, res){
    res.render('profile/show');
});

router.get('/:id', function(req, res){
        console.log('req.params.id', req.params.id);
	User.findById(req.params.id, function(err, user){
        console.log('user', user);
		if(err){
			console.log(err);
		} else {
			res.render('profile/showPublic', {user: user});
		}
    })
    console.log('heres get profile post psot');
    
});

router.get('/:id/edit', isLoggedIn, function(req, res){
    res.render('profile/edit');
});

router.put('/:id', isLoggedIn, function(req, res){
	// res.send(req.body);
    User.findByIdAndUpdate(req.params.id, req.body, function(err, updateUser) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/profile');
        }
    })
});

// router.post('/avatar', upload.single('avatar'), function(req, res) {
//     try {
//         const col = await loadCollection(COLLECTION_NAME, db);
//         const data = col.insert(req.file);

//         db.saveDatabase();
//         res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
//     } catch (err) {
//         res.sendStatus(400);
//     }

// });

// MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;