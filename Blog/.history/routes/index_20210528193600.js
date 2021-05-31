var express = require('express');
var router = express.Router();
var data=require('../config/config');

/* GET home page. */
router.get('/', function(req, res, next){
  if (req.session.user == undefined){
    res.redirect("http://localhost:3000/login")
      }else{
      res.render('index');
 }
 data.db.query("select * from essay ORDER BY article_id LIMIT 0,5",(err,results)=>{
  if(err!= null){
    console.log(err)
  }else{
    res.render('index',{datil:newdata});
  }
})
});
module.exports = router;
