let express = require('express'),
    router  = express();

router.get('/*', function (req, res) {
  res.render('app/main');
});

module.exports = router;