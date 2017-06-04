var express = require('express'),
	router	= express();



router.get('/', function(req, res){
	res.redirect('/books');
});

module.exports = router;