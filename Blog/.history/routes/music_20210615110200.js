var express = require('express');
var config = require("../config/config");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  config.HasSession(req,res);
  res.render('music');
});

module.exports = router;
