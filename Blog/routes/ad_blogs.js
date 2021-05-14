var express = require('express');
var router = express.Router();
var config = require('../config/config');
/* GET home page. */
router.get('/', function(req, res, next) {
  let user = config.user(req);
  res.render('admin/blogs',{name:user.name,icon:user.icon});
});

module.exports = router;
