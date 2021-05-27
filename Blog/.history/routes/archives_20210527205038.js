var express = require('express');
var config = require('../config/config');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
config.db.query("select * from essay order by article_date DESC LIMIT 10")
  res.render('archives');
});

module.exports = router;
