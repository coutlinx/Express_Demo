var express = require('express');
var router = express.Router();
var db = require('../config/config')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/types');
  
});

module.exports = router;
