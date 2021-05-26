var express = require('express');
var router = express.Router();
var data=require('../config/config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('types');
  
});
router.post('/maple_left',function(req,res,next){
  let data="";
  data.db.connect();
  data.db.query("select * from essay",(err,results,fields)=>{
    if (err !=null){
      console.log(err);
    }else{
      console.log(results)
    }
  });
  data.db.end();
})

router.post('/newclassfiy',function(req,res,next){
  let newdata="";
  
    data.db.connect();
    data.db.query("select * from essay",(err,results,fields)=>{
      if (err !=null){
        console.log(err);
      }else{
          
      }
    });
    data.db.end();
        
})


module.exports = router;
