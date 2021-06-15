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
    db.db.query("select * from user_friends as u where u.use_id=(select user.use_id from user where use_name=?) ORDER BY use_id LIMIT ",[req.session.usename],(err,results)=>{
      if(err !=null){
        console.log(err)
      }else{
        datail=results
        console.log(datail);
        db.db.query("SELECT e.article_classify,e.article_views,e.article_content,e.article_date,e.article_photo,e.article_title,e.article_comment_count,u.use_friends_name FROM essay AS e INNER JOIN user_friends AS u ON u.use_friends_id = e.use_id WHERE e.use_id IN ( SELECT user_friends.use_friends_id FROM user_friends WHERE use_id = ( SELECT USER.use_id FROM USER WHERE use_name =?) ) GROUP BY article_id ORDER BY article_id LIMIT 0,5",[req.session.usename],(err,results)=>{
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
