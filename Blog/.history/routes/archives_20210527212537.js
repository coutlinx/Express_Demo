var express = require('express');
var config = require('../config/config');
var sd = require('silly-datetime');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
config.db.query("select * from essay order by article_date DESC LIMIT 10",(err,results,fild)=>{
  if(err != null){
    console.log(err)
  }else{
    for(let i in results){
      results[i].article_date = sd.format(results[i].article_date,'YYYY-MM-DD')
    }
    console.log(results);
    
    res.render('archives',{data:results});
  }
})
});

module.exports = router;
