var express = require('express');
var router = express.Router();
var data=require("../config/config");

/* GET home page. */
router.get('/', function(req,res,next) {
   res.render('admin/types-new');
});

module.exports = router;
