var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.user == undefined){
    res.redirect("http://localhost:3000/login")
  }else{
    res.render('index');
  }
});

module.exports = router;
