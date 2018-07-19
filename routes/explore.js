let express = require('express'),
    router = express();

router.get('/', function (req, res) {
  console.log('explore');
  res.render('explore/main');
});

module.exports = router;