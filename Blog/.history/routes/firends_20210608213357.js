var express = require('express');
var router = express.Router();
var db=require('../config/config');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.usename);
  if(req.session.usename==undefined){
     res.redirect('login')
  }else{
    db.db.query("select * from user_friends as u where u.use_id=(select user.use_id from user where use_name=?)",[req.session.usename],(err,results)=>{
      if(err !=null){
        console.log(err)
      }else{
         res.render('friends',{datail:results});
      }
    })
   
  }
  
});

module.exports = router;
