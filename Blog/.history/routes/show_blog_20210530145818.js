var express = require('express');
var router = express.Router();

router.get('/:?', function(req, res, next) {
  console.log(req.query)
  res.render('show_blog');
});

module.exports = router;
