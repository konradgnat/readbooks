let express = require('express'),
  router = express();

router.get('/*', function(req, res) {
  res.render('app/main', { appData: res.locals.currentUser || {} });
});

module.exports = router;
