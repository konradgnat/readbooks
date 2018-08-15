let express = require('express'),
    router  = express();

router.get('/*', function (req, res) {
  const props = {
    name: 'developer'
  };
  res.render('app/main', { props });
});

module.exports = router;