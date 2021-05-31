var express = require('express');
var router = express.Router();

router.get('/:', function(req, res, next) {
  res.render('show_blog');
});

module.exports = router;
