var express = require('express');
var config = require("../config/config");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  config.IsAdmin(req)
  if(!config.HasSession(req,res)){
    return;
  }else{
    res.render('admin/pictures');
  }
});

module.exports = router;
