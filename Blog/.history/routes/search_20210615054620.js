var express = require('express');
var config = require('../config/config')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  config.HasSession(req,res);
  res.render('search');
});
router.post('/',(req,res)=>{
  console.log(req.body.query)
  req.body.query = "%"+req.body.query+"%"
  config.db.query("select count(*) as num from essay where article_title like ?",[req.body.query],(err,results,fild)=>{
    if(err!=null){
      console.log(err)
    }else{
      let num = results[0].num
      console.log(num);
      config.db.query("select * from essay inner join user on essay.use_id = user.use_id where article_title like ?",[req.body.query],(err,results,fild)=>{
        if(err != null){
          console.log(err)
        }else{
          console.log(results);
          res.render('search',{count:num,data:results})
        }
      })
    }
  })
})
module.exports = router;
