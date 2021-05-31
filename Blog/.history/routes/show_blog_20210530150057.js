var express = require('express');
var config = require('../config/config');
var router = express.Router();

router.get('/:?', function(req, res, next) {
  console.log(req.query.id)

  res.render('show_blog');
});

module.exports = router;
