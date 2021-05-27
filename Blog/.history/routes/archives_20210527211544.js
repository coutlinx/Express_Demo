var express = require('express');
var config = require('../config/config');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
config.db.query("select * from essay order by article_date DESC LIMIT 10",(err,results,fild)=>{
  if(err != null){
    console.log(err)
  }else{
    console.log(results);
  }
})
  res.render('archives');
});

module.exports = router;
