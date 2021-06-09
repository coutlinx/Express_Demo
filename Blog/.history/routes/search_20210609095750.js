var express = require('express');
var config = require('../config/config')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('search');
});
router.post('/',(req,res)=>{
  console.log(req.body.query)
  config.db.query("select count(*) as num from essay where article_title like ?",[req.body.query],(err,results,fild)=>{
    if(err!=null){
      console.log(err)
    }else{
      let num = results[0].num
      console.log(num);
      config.db.query("select * from essay where article_title like ?",[req.body.query],(err,results,fild)=>{
        if(err != null){
          console.log(err)
        }else{
          console.log(results);
        }
      })
    }
  })
})
module.exports = router;
