var express = require('express');
var router = express.Router();
var data=require('../config/config');

/* GET home page. */
router.get('/', function(req, res, next){
  let datas,datai;
  if (req.session.user == undefined){
    res.redirect("http://localhost:3000/login")
      }else{
 data.db.query("select * from essay ORDER BY article_id LIMIT 0,5",(err,results,fields)=>{
  if (err !=null){
    console.log(err);
  }else{
      datai=results
       data.db.query("select * from essay ORDER BY article_id LIMIT 0,4",(err,results,fields)=>{
          if(err !=null){
            console.log(err)
          }else{
              datas=results;
             res.render('index',{datil:datai,datas:datas})
         
            }
       })
  }
})
 }
});
module.exports = router;
