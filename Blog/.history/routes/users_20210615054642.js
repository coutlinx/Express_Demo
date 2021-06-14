var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  config.HasSession(req,res);
  res.send('respond with a resource');
});

module.exports = router;
