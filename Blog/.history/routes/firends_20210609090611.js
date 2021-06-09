var express = require('express');
var router = express.Router();
var db=require('../config/config');

/* GET home page. */
router.get('/', function(req, res, next) {
  var datail,datas;
  console.log(req.session.usename);
  if(req.session.usename==undefined){
     res.redirect('login')
  }else{
    db.db.query("select * from user_friends as u where u.use_id=(select user.use_id from user where use_name=?)",[req.session.usename],(err,results)=>{
      if(err !=null){
        console.log(err)
      }else{
        datail=results
        console.log(datail);
        db.db.query("SELECT * FROM essay INNER JOIN user_friends ON user_friends.use_friends_id=essay.use_id WHERE essay.use_id=?",[datail[0].use_friends_id],(err,results)=>{
          if(err !=null){
            console.log(err)
          }else{
              datas=results;
              console.log(datas);
              res.render('friends',{datail:datail,datas:datas});
          }
        })
         
      }
    })
   
  }
  
});

module.exports = router;
