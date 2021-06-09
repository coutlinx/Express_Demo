var express = require('express');
var config = require('../config/config');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  config.db.query("select * from message_board inner join user on message_board.use_id = user.use_id")
  res.render('message');
});

module.exports = router;
