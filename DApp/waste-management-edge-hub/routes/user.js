var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/one', function(req, res) {
  res.send('one user will be sent');
});


module.exports = router;
