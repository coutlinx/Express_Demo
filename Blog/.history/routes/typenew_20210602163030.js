var express = require('express');
var router = express.Router();
var data=require("../config/config");
var cookieParser = require('cookie-parser');
var session = require('express-session');

/* GET home page. */
router.get('/', function(req,res,next) {
   res.render('admin/types-new');
});
 
router.post('/compile',(req,res,next)=>{
  data.db.query("updata classfiy set sort_name=replace(sort_name,?,?) where id=?",)
})

module.exports = router;
