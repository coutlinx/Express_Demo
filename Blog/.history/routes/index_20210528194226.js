var express = require('express');
var router = express.Router();
var data=require('../config/config');

/* GET home page. */
router.get('/', function(req, res, next){
  if (req.session.user == undefined){
    res.redirect("http://localhost:3000/login")
      }else{
 data.db.query("select * from essay ORDER BY article_id LIMIT 0,5",(err,results,fields)=>{
  if (err !=null){
    console.log(err);
  }else{
    // console.log(results)
     res.render('index',{datil:results})
  }
})
 }

});
module.exports = router;
