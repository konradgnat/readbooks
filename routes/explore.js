let express = require('express'),
    router  = express();

router.get('/', function (req, res) {
  res.render('explore/main');
});

module.exports = router;